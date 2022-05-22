const hints = [
    {
        code: "GQ",
        text: "The country used to be known as: ",
        options: [
            { text: "Italian Guinea" },
            { text: "Portuguese Guinea" },
            { text: "Spanish Guinea", isCorrect: true },
            { text: "German Guinea" }
        ]
    }
]

export function getHint(country) {
    return hints.filter(hint => country.code === hint.code)[0];
}
