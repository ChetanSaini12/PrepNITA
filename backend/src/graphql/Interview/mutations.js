export const mutations = `#graphql
    getInterview(intervieweeId : Int, interviewerId : Int) : [Interview]

    getInterviewById(interviewId : Int!) : Interview

    createInterview(Interview : InterviewInput) : Interview
    
    updateInterview(interviewId : Int!) : Interview

    deleteInterview(interviewId : Int!) : String

    assignInterview(interviewId : Int!) : Interview

    giveFeedback(Feedback : FeedbackInput) : Feedback

    revokeInterview(Interview : InterviewInput) : Interview
`
