export default {
    title: {
        presence: true,
        length: {
            minimum: 5,
            maximum: 50,
            tooShort: "needs to have %{count} words or more",
            tooLong: "should not exceed %{count} chars",
        }
    },
    content: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 1000,
            tooShort: "needs to have %{count} words or more",
            tooLong: "should not exceed %{count} chars",
        }
    }
}
