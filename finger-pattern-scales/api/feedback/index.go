package feedback

import (
	"encoding/json"
	"fmt"
	"net/http"
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

	var data = json.NewDecoder(r.Body)
	if err := data.Decode(&quizResults); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Fprintf(w, "Correct: %d, Incorrect: %d", quizResults.Correct, quizResults.Incorrect)
}
