package feedback

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

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
				patterns = append(patterns, "1-2 Pattern")
			case "twoThree":
				patterns = append(patterns, "2-3 Pattern")
			case "threeFour":
				patterns = append(patterns, "3-4 Pattern")
			case "wholeSteps":
				patterns = append(patterns, "Whole Steps Pattern")
			case "halfSteps":
				patterns = append(patterns, "Half Steps Pattern")
			default:
				continue
			}
		}
	}

	client := openai.NewClient(apiKey)

	percentage := (quizResults.Correct / (quizResults.Correct + quizResults.Incorrect)) * 100
	prompt := fmt.Sprintf("Write a short, simple, positive message giving based on a quiz score of %v percent "+
		"No need to thank the user. Say something encouraging like 'Great job!' or 'Keep working on it' "+
		" then tell the user they need to practice more on the following, if provided: "+
		" Strings: %v, Patterns: %v. eg. You need to work more on the A and D strings. "+
		" or 'You need to practice the 1-2 pattern some more.' "+
		"Write at most 4 sentences.",
		percentage,
		strings.Join(violinStrings, ", "),
		strings.Join(patterns, ", "),
	)

	req := openai.ChatCompletionRequest{
		Model:     openai.GPT3Dot5Turbo,
		MaxTokens: 100,
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
