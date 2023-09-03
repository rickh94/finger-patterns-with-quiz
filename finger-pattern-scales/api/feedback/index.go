package feedback

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	openai "github.com/sashabaranov/go-openai"
)

type Missed struct {
	ViolinString    map[string]int `json:"violinString"`
	PatternId       map[string]int `json:"patternId"`
	PatternPosition map[string]int `json:"patternPosition"`
}

type QuizResults struct {
	Correct   int    `json:"correct"`
	Incorrect int    `json:"incorrect"`
	Missed    Missed `json:"missed"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	var quizResults QuizResults

	if err := json.NewDecoder(r.Body).Decode(&quizResults); err != nil {
		http.Error(w, "Could not decode Results Json", http.StatusBadRequest)
		return
	}
	apiKey := os.Getenv("OPENAI_KEY")
	if apiKey == "" {
		http.Error(w, "No OpenAI Key", http.StatusInternalServerError)
		return
	}
	var violinStrings []string
	for violinString, count := range quizResults.Missed.ViolinString {
		if count >= 2 {
			violinStrings = append(violinStrings, violinString)
		}
	}

	var patterns []string
	for pattern, count := range quizResults.Missed.PatternId {
		if count >= 2 {
			switch pattern {
			case "oneTwo":
				patterns = append(violinStrings, "1-2 Pattern")
			case "twoThree":
				patterns = append(violinStrings, "2-3 Pattern")
			case "threeFour":
				patterns = append(violinStrings, "3-4 Pattern")
			case "wholeSteps":
				patterns = append(violinStrings, "Whole Steps Pattern")
			case "halfSteps":
				patterns = append(violinStrings, "Half Steps Pattern")
			default:
				continue
			}
		}
	}

	client := openai.NewClient(apiKey)

	percentage := quizResults.Correct / (quizResults.Correct + quizResults.Incorrect) * 100
	prompt := fmt.Sprintf("Write a positive tone message giving feedback base on a quiz score of %v percent"+
		" then tell the user they need to practice more on the following, if provided: "+
		" Strings: %v, Patterns: %v.", percentage, violinStrings, patterns)

	req := openai.ChatCompletionRequest{
		Model:     openai.GPT3Dot5Turbo,
		MaxTokens: 200,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleAssistant,
				Content: prompt,
			},
		},
	}

	ctx := context.Background()
	resp, err := client.CreateChatCompletion(ctx, req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// fmt.Fprintf(w, "Correct: %d, Incorrect: %d", quizResults.Correct, quizResults.Incorrect)
	fmt.Fprintf(w, resp.Choices[0].Message.Content)
}
