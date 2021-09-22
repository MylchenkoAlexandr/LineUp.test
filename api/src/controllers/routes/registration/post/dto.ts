export default {
    username: {
        presence: true,
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 6,
            tooShort: "needs to have %{count} words or more"
        }
    }
}
