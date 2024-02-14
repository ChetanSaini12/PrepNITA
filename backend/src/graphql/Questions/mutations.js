export const mutations = `#graphql
    createQuestion(Question : QuestionInput) : Question 

    getQuestionById(QuestionId : Int!) : Question

    upVoteQuestion(QuestionId : Int!) : Question  
    
    downVoteQuestion(QuestionId : Int!) : Question
    
    changeApproveStatusOfQue(QuestionId : Int!) : Question

    deleteQuestion(QuestionId : Int!) : String

    updateQuestion(QuestionId : Int!, Question : QuestionInput) : Question

    tempQuestion(tempVal : String) : String
`