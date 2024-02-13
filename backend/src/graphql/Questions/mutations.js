export const mutations = `#graphql
    createQuestion(Question : QuestionInput) : Question 

    upVoteQuestion(QuestionId : Int!, userId : Int!) : Question  
    
    downVoteQuestion(QuestionId : Int!, userId : Int!) : Question
    
    changeApproveStatusOfQue(QuestionId : Int!) : Question

    deleteQuestion(QuestionId : Int!) : String

    updateQuestion(QuestionId : Int!, Question : QuestionInput) : Question

    tempQuestion(tempVal : String) : String
`