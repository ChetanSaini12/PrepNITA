export const mutations = `#graphql

    createQuiz(Quiz : quizInput) : Quiz

    deleteQuiz(QuizId : Int!) : String

    getQuizById(QuizId : Int!) : Quiz

    getAllQuiz : [Quiz]

    changeApproveStatusOfQuiz(quizId : Int!) : Quiz
    
    changeVisibleStatusOfQuiz(quizId : Int!) : Quiz

    updateQuiz(quizId : Int!, Quiz : quizInput) : Quiz 

    addQuestionToQuiz(question : addQuestion) : QuizQuestion

    deleteQuestionOfQuiz(questionId : Int!) : String 
`