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
            { text: "Cyrillic: а б в г д е", isCorrect: true },
            { text: "Greek:  α β γ δ ε ζ" },
            { text: "Arabic:  ح ج ث ت ب" },
            { text: "Hebrew: א ב ג ד ה ו" }
        ]
    },
    {
        code: "JP",
        text: "The country's capital is:",
        options: [
            { text: "World's Smallest Capital" },
            { text: "World's Most Dangerous City" },
            { text: "World's Most Populated City", isCorrect: true },
            { text: "World's Least Visited Capital" }
        ]
    },
    {
        code: "TN",
        text: "Cape Angela, located in this country, is:",
        options: [
            { text: "The easternmost point of Asia" },
            { text: "The nothernmost point of Africa", isCorrect: true },
            { text: "The southernmost point of Europe" },
            { text: "The highest point of Asia" }
        ]
    },
    {
        code: "CF",
        text: "This country features:",
        options: [
            { text: "The highest point of Africa" },
            { text: "The biggest lake in Africa" },
            { text: "The 'geographical center' of Africa", isCorrect: true },
            { text: "The lowest point of Africa" }
        ]
    },
    {
        code: "GS",
        text: "This country was the site of:",
        options: [
            { text: "The southernmost battle ever fought", isCorrect: true },
            { text: "XVIII Olympic Games" },
            { text: "Soviet nuclear tests" },
            { text: "A disastrous volcano eruption" }
        ]
    },
    {
        code: "MZ",
        text: "The first European to visit the country was:",
        options: [
            { text: "🇫🇷 Jacques Marquette" },
            { text: "🇪🇸 Christopher Columbus" },
            { text: "🇬🇧 Sir John Hawkins" },
            { text: "🇵🇹 Vasco da Gama", isCorrect: true }
        ]
    },
    {
        code: "AL",
        text: "An acclaimed hero, Nobel prize winner and a saint of this country is:",
        options: [
            { text: "14th Dalai Lama" },
            { text: "Mother Teresa", isCorrect: true },
            { text: "Pope John Paul II" },
            { text: "Дмитрий Муратов" }
        ]
    },
    {
        code: "YE",
        text: "A world-known type of coffee is named after a city in this country:",
        options: [
            { text: "Mocha", isCorrect: true },
            { text: "Cappuccino" },
            { text: "Americano" },
            { text: "Espresso" }
        ]
    },
    {
        code: "KZ",
        text: "This country is the largest ... in the world:",
        options: [
            { text: "landlocked country", isCorrect: true },
            { text: "producent of cocoa" },
            { text: "importer of coffee" },
            { text: "catholic population" }
        ]
    },
    {
        code: "FR",
        text: "This country is divided into:",
        options: [
            { text: "lands" },
            { text: "cantons" },
            { text: "departments", isCorrect: true },
            { text: "voivodeships" }
        ]
    },
    {
        code: "SM",
        text: "This country is the world's oldest:",
        options: [
            { text: "kingdom" },
            { text: "republic", isCorrect: true },
            { text: "federation" },
            { text: "empire" }
        ]
    },
    {
        code: "VA",
        text: "This country is the world's:",
        options: [
            { text: "smallest independent nation", isCorrect: true },
            { text: "biggest enclave" },
            { text: "least religious country" },
            { text: "last dictatorship" }
        ]
    },
    {
        code: "RW",
        text: "This country is described as the:",
        options: [
            { text: "'land of a thousand hills'", isCorrect: true },
            { text: "'dead river land'" },
            { text: "'land of the rolling sand'" },
            { text: "'edge of the world'" }
        ]
    },
    {
        code: "DK",
        text: "This country occupies:",
        options: [
            { text: "both banks of Nile" },
            { text: "a whole continent" },
            { text: "the peninsula of Jutland", isCorrect: true },
            { text: "the Iberian peninsula" }
        ]
    },
    {
        code: "SR",
        text: "This country is formerly known as:",
        options: [
            { text: "Irish Virgin Islands" },
            { text: "Dutch Guiana", isCorrect: true },
            { text: "Brasilia Italiana" },
            { text: "Spanish Ghana" }
        ]
    },
    {
        code: "IR",
        text: "This country's lake Urmia is:",
        options: [
            { text: "the largest lake in the Middle East", isCorrect: true  },
            { text: "the longest lake in Europe"},
            { text: "the largest freshwater lake on Earth" },
            { text: "the deepest lake of Asia" }
        ]
    },
    {
        code: "GT",
        text: "This country once co-formed a federation of:",
        options: [
            { text: "United Provinces of Central America", isCorrect: true  },
            { text: "Greater Republics of Central America"},
            { text: "United States of South America" },
            { text: "USSR" }
        ]
    },
    {
        code: "SV",
        text: "This country is the:",
        options: [
            { text: "smallest country in North America"},
            { text: "biggest country in Africa" },
            { text: "smallest country in Central America", isCorrect: true  },
            { text: "biggest country in Central America" }
        ]
    },
    {
        code: "KW",
        text: "This country granted women the right to vote in:",
        options: [
            { text: "1950"},
            { text: "1905" },
            { text: "1985" },
            { text: "2005", isCorrect: true  },
        ]
    },
    {
        code: "DZ",
        text: "This country is the:",
        options: [
            { text: "southernmost country in Africa"},
            { text: "coldest country in Africa" },
            { text: "flattest country in Europe" },
            { text: "largest country in Africa", isCorrect: true  },
        ]
    }
]

export function getHint(country) {
    return hints.filter(hint => country.code === hint.code)[0];
}
