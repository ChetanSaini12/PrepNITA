export const mutations = `#graphql
    createInterview(Interview : InterviewInput) : Interview
    
    updateInterview(interviewId : Int!) : Interview

    deleteInterview(interviewId : Int!) : String

    assignInterview(interviewId : Int!) : Interview

    giveFeedback(Feedback : FeedbackInput) : Feedback

    revokeInterview(interviewId : Int!) : Interview
`