export const hints = [
    {
        code: "GQ",
        text: "The country used to be known as: ",
        options: [
            { text: "Italian Guinea" },
            { text: "Portuguese Guinea" },
            { text: "Spanish Guinea", isCorrect: true },
            { text: "German Guinea" }
        ]
    },
    {
        code: "BG",
        text: "The country is a birthplace of this alphabet: ",
        options: [
            { text: "Cyrillic: а б в г д е", isCorrect: true},
            { text: "Greek:  α β γ δ ε ζ" },
            { text: "Arabic:  ح ج ث ت ب"},
            { text: "Hebrew: א ב ג ד ה ו" }
        ]
    },
    {
        code: "JP",
        text: "The country's capital is:",
        options: [
            { text: "World's Smallest Capital"},
            { text: "World's Most Dangerous City"},
            { text: "World's Most Populated City", isCorrect: true },
            { text: "World's Least Visited Capital" }
        ]
    },
    {
        code: "TN",
        text: "Cape Angela, located in this country is:",
        options: [
            { text: "The easternmost point of Asia"},
            { text: "The nothernmost point of Africa", isCorrect: true },
            { text: "The southernmost point of Europe"},
            { text: "The highest point of Asia" }
        ]
    }
]

export function getHint(country) {
    return hints.filter(hint => country.code === hint.code)[0];
}
