const queries = {
    tempQueQr : () => {return "RADHE"}
}

const mutations = {
    createQuestion : (_, payload) => {},
    tempQuestion : (_, payload) => {return payload.tempVal}
}

export const resolvers = {queries , mutations}