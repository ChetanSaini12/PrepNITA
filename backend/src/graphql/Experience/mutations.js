export const mutations = `#graphql
    getAllExperience() : [Experience]

    getExperienceById(experienceId : Int!) : Experience

    createExperience(Experience : InputExperience) : Experience
    
    updateExperience(id : Int!, Experience : InputExperience) : Experience

    deleteExperience(id : Int!) : Experience

    upvoteExperience(id : Int!) : Experience
    
    downvoteExperience(id : Int!) : Experience
`
