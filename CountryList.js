const countryList = [
    { code: "AF", name: "Afghanistan", lat: 33.93911, lon: 67.709953, emoji: "🇦🇫" },
    // { code: "AX", name: "\u00c5land Islands" },
    { code: "AL", name: "Albania", lat: 41.153332, lon: 20.168331, flag: require("./img/512px-Flag_of_Albania.png"), emoji: "🇦🇱" },
    { code: "DZ", name: "Algeria", lat: 28.033886, lon: 1.659626, flag: require("./img/Flag_of_Algeria.png"), emoji: "🇩🇿" },
    { code: "AS", name: "American Samoa", lat: -14.270972, lon: -170.132217 },
    { code: "AD", name: "Andorra", lat: 42.546245, lon: 1.601554, flag: require("./img/Flag_of_Andorra.svg.png"), emoji: "🇦🇩" },
    { code: "AO", name: "Angola", lat: -11.202692, lon: 17.873887 },
    { code: "AI", name: "Anguilla", lat: 18.220554, lon: -63.068615 },
    { code: "AQ", name: "Antarctica", lat: -75.250973, lon: -0.071389, flag: require("./img/Flag_of_the_Antarctic_Treaty.png"), emoji: "🇦🇶" },
    { code: "AG", name: "Antigua and Barbuda", lat: 17.060816, lon: -61.796428 },
    { code: "AR", name: "Argentina", lat: 38.416097, lon: -63.616672, flag: require("./img/Flag_of_Argentina.png") },
    { code: "AM", name: "Armenia", lat: 40.069099, lon: 45.038189 },
    { code: "AW", name: "Aruba", lat: 12.52111, lon: -69.968338 },
    { code: "AU", name: "Australia", lat: -25.274398, lon: 133.775136, flag: require("./img/Flag_of_Australia_(converted).png") },
    { code: "AT", name: "Austria", lat: 47.516231, lon: 14.550072, flag: require("./img/Flag_of_Austria.png") },
    { code: "AZ", name: "Azerbaijan", lat: 40.143105, lon: 47.576927 },
    { code: "BS", name: "Bahamas", lat: 25.03428, lon: -77.39628 },
    { code: "BH", name: "Bahrain", lat: 25.930414, lon: 50.637772 },
    { code: "BD", name: "Bangladesh", lat: 23.684994, lon: 90.356331 },
    { code: "BB", name: "Barbados", lat: 13.193887, lon: -59.543198 },
    { code: "BY", name: "Belarus", lat: 53.709807, lon: 27.953389, flag: require("./img/Flag_of_Belarus.png") },
    { code: "BE", name: "Belgium", lat: 50.503887, lon: 4.469936, flag: require("./img/Flag_of_Belgium.png") },
    { code: "BZ", name: "Belize", lat: 17.189877, lon: -88.49765 },
    { code: "BJ", name: "Benin", lat: 9.30769, lon: 2.315834 },
    { code: "BM", name: "Bermuda", lat: 32.321384, lon: -64.75737 },
    { code: "BT", name: "Bhutan", lat: 27.514162, lon: 90.433601 },
    { code: "BO", name: "Bolivia", lat: -16.290154, lon: -63.588653 },
    // { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
    { code: "BA", name: "Bosnia and Herzegovina", lat: 43.915886, lon: 17.679076 },
    { code: "BW", name: "Botswana", lat: -22.328474, lon: 24.684866 },
    { code: "BV", name: "Bouvet Island", lat: -54.423199, lon: 3.413194 },
    { code: "BR", name: "Brazil", lat: -14.235004, lon: -51.92528, flag: require("./img/640px-Flag_of_Brazil.png")},
    { code: "IO", name: "British Indian Ocean Territory", lat: -6.343194, lon: 71.876519 },
    { code: "BN", name: "Brunei", lat: 4.535277, lon: 114.727669 },
    { code: "BG", name: "Bulgaria", lat: 42.733883, lon: 25.48583, flag: require("./img/Flag_of_Bulgaria.png")},
    { code: "BF", name: "Burkina Faso", lat: 12.238333, lon: -1.561593 },
    { code: "BI", name: "Burundi", lat: 3.373056, lon: 29.918886 },
    { code: "KH", name: "Cambodia", lat: 12.565679, lon: 104.990963 },
    { code: "CM", name: "Cameroon", lat: 7.369722, lon: 12.354722 },
    { code: "CA", name: "Canada", lat: 56.130366, lon: -106.346771, flag: require("./img/640px-Flag_of_Canada_(Pantone).png")},
    { code: "CV", name: "Cape Verde", lat: 16.002082, lon: -24.013197 },
    { code: "KY", name: "Cayman Islands", lat: 19.513469, lon: -80.566956 },
    { code: "CF", name: "Central African Republic", lat: 6.611111, lon: 20.939444 },
    { code: "TD", name: "Chad", lat: 15.454166, lon: 18.732207 },
    { code: "CL", name: "Chile", lat: -35.675147, lon: -71.542969 },
    { code: "CN", name: "China", lat: 35.86166, lon: 104.195397, flag: require("./img/Flag_of_the_People's_Republic_of_China.png")},
    { code: "CX", name: "Christmas Island", lat: -10.447525, lon: 105.690449 },
    { code: "CC", name: "Cocos (Keeling) Islands", lat: -12.164165, lon: 96.870956 },
    { code: "CO", name: "Colombia", lat: 4.570868, lon: -74.297333 },
    { code: "KM", name: "Comoros", lat: -11.875001, lon: 43.872219 },
    { code: "CG", name: "Congo", lat: -0.228021, lon: 15.827659 },
    { code: "CD", name: "Congo, the Democratic Republic of the", lat: -4.038333, lon: 21.758664 },
    { code: "CK", name: "Cook Islands", lat: -21.236736, lon: -159.777671 },
    { code: "CR", name: "Costa Rica", lat: 9.748917, lon: -83.753428 },
    { code: "CI", name: "C\u00f4te d'Ivoire", lat: 7.539989, lon: -5.54708 },
    { code: "HR", name: "Croatia", lat: 45.1, lon: 15.2, flag: require("./img/Flag_of_Croatia.png")},
    { code: "CU", name: "Cuba", lat: 21.521757, lon: -77.781167 },
    // { code: "CW", name: "Cura\u00e7ao" },
    { code: "CY", name: "Cyprus", lat: 35.126413, lon: 33.429859 },
    { code: "CZ", name: "Czech Republic", lat: 49.817492, lon: 15.472962, flag: require("./img/Flag_of_the_Czech_Republic.png")},
    { code: "DK", name: "Denmark", lat: 56.26392, lon: 9.501785, flag: require("./img/Flag_of_Denmark.png")},
    { code: "DJ", name: "Djibouti", lat: 11.825138, lon: 42.590275 },
    { code: "DM", name: "Dominica", lat: 15.414999, lon: -61.370976 },
    { code: "DO", name: "Dominican Republic", lat: 18.735693, lon: -70.162651 },
    { code: "EC", name: "Ecuador", lat: -1.831239, lon: -78.183406 },
    { code: "EG", name: "Egypt", lat: 26.820553, lon: 30.802498, flag: require("./img/Flag_of_Egypt.png")},
    { code: "SV", name: "El Salvador", lat: 13.794185, lon: -88.89653 },
    { code: "GQ", name: "Equatorial Guinea", lat: 1.650801, lon: 10.267895 },
    { code: "ER", name: "Eritrea", lat: 15.179384, lon: 39.782334 },
    { code: "EE", name: "Estonia", lat: 58.595272, lon: 25.013607, flag: require("./img/640px-Flag_of_Estonia.png")},
    { code: "ET", name: "Ethiopia", lat: 9.145, lon: 40.489673 },
    { code: "FK", name: "Falkland Islands (Malvinas)", lat: -51.796253, lon: -59.523613 },
    { code: "FO", name: "Faroe Islands", lat: 61.892635, lon: -6.911806 },
    { code: "FJ", name: "Fiji", lat: -16.578193, lon: 179.414413 },
    { code: "FI", name: "Finland", lat: 61.92411, lon: 25.748151, flag: require("./img/Flag_of_Finland.png")},
    { code: "FR", name: "France", lat: 46.227638, lon: 2.213749, flag: require("./img/Flag_of_France.png")},
    { code: "GF", name: "French Guiana", lat: 3.933889, lon: -53.125782 },
    { code: "PF", name: "French Polynesia", lat: -17.679742, lon: -149.406843 },
    { code: "TF", name: "French Southern Territories", lon: -49.280366, lon: 69.348557 },
    { code: "GA", name: "Gabon", lat: -0.803689, lon: 11.609444 },
    { code: "GM", name: "Gambia", lat: 13.443182, lon: -15.310139 },
    { code: "GE", name: "Georgia", lat: 42.315407, lon: 43.356892, flag: require("./img/Flag_of_Georgia.png")},
    { code: "DE", name: "Germany", lat: 51.165691, lon: 10.451526, flag: require("./img/320px-Flag_of_Germany.png")},
    { code: "GH", name: "Ghana", lat: 7.946527, lon: -1.023194 },
    { code: "GI", name: "Gibraltar", lat: 36.137741, lon: -5.345374, flag: require("./img/640px-Flag_of_Estonia.png")},
    { code: "GR", name: "Greece", lat: 39.074208, lon: 21.824312, flag: require("./img/Flag_of_Greece.png")},
    { code: "GL", name: "Greenland", lat: 71.706936, lon: -42.604303 },
    { code: "GD", name: "Grenada", lat: 12.262776, lon: -61.604171 },
    { code: "GP", name: "Guadeloupe", lat: 16.995971, lon: -62.067641 },
    { code: "GU", name: "Guam", lat: 13.444304, lon: 144.793731 },
    { code: "GT", name: "Guatemala", lat: 15.783471, lon: -90.230759 },
    { code: "GG", name: "Guernsey", lat: 49.465691, lon: -2.585278 },
    { code: "GN", name: "Guinea", lat: 9.945587, lon: -9.696645 },
    { code: "GW", name: "Guinea-Bissau", lat: 11.803749, lon: -15.180413 },
    { code: "GY", name: "Guyana", lat: 4.860416, lon: -58.93018 },
    { code: "HT", name: "Haiti", lat: 18.971187 - 72.285215 },
    { code: "HM", name: "Heard Island and McDonald Islands", lat: -53.08181, lon: 73.504158 },
    { code: "VA", name: "Vatican (Holy See)", lat: 41.902916, lon: 12.453389 },
    { code: "HN", name: "Honduras", lat: 15.199999, lon: -86.241905 },
    { code: "HK", name: "Hong Kong", lat: 22.396428, lon: 114.109497, flag: require("./img/Flag_of_Hong_Kong.png")},
    { code: "HU", name: "Hungary", lat: 47.162494, lon: 19.503304 },
    { code: "IS", name: "Iceland", lat: 64.963051, lon: -19.020835 },
    { code: "IN", name: "India", lat: 20.593684, lon: 78.96288 },
    { code: "ID", name: "Indonesia", lat: -0.789275, lon: 113.921327 },
    { code: "IR", name: "Iran", lat: 32.427908, lon: 53.688046 },
    { code: "IQ", name: "Iraq", lat: 33.223191, lon: 43.679291 },
    { code: "IE", name: "Ireland", lat: 53.41291, lon: -8.24389 },
    { code: "IM", name: "Isle of Man", lat: 54.236107, lon: -4.548056 },
    { code: "IL", name: "Israel", lat: 31.046051, lon: 34.851612 },
    { code: "IT", name: "Italy", lat: 41.87194, lon: 12.56738 },
    { code: "JM", name: "Jamaica", lat: 18.109581, lon: -77.297508 },
    { code: "JP", name: "Japan", lat: 36.204824, lon: 138.252924 },
    { code: "JE", name: "Jersey", lat: 49.214439, lon: -2.13125 },
    { code: "JO", name: "Jordan", lat: 30.585164, lon: 36.238414 },
    { code: "KZ", name: "Kazakhstan", lat: 48.019573, lon: 66.923684 },
    { code: "KE", name: "Kenya", lat: -0.023559, lon: 37.906193 },
    { code: "KI", name: "Kiribati", lat: -3.370417, lon: -168.734039 },
    { code: "KP", name: "Korea, Democratic People's Republic of (North)", lat: 40.339852, lon: 127.510093 },
    { code: "KR", name: "Korea, Republic of (South)", lat: 35.907757, lon: 127.766922 },
    { code: "KW", name: "Kuwait", lat: 29.31166, lon: 47.481766 },
    { code: "KG", name: "Kyrgyzstan", lat: 41.20438, lon: 74.766098 },
    { code: "LA", name: "Lao People's Democratic Republic (Laos)", lat: 19.85627, lon: 102.495496 },
    { code: "LV", name: "Latvia", lat: 56.879635, lon: 24.603189 },
    { code: "LB", name: "Lebanon", lat: 33.854721, lon: 35.862285 },
    { code: "LS", name: "Lesotho", lat: -29.609988, lon: 28.233608 },
    { code: "LR", name: "Liberia", lat: 6.428055, lon: -9.429499 },
    { code: "LY", name: "Libya", lat: 26.3351, lon: 17.228331 },
    { code: "LI", name: "Liechtenstein", lat: 47.166, lon: 9.555373 },
    { code: "LT", name: "Lithuania", lat: 55.169438, lon: 23.881275 },
    { code: "LU", name: "Luxembourg", lat: 49.815273, lon: 6.129583 },
    { code: "MO", name: "Macao", lat: 22.198745, lon: 113.543873 },
    { code: "MK", name: "North Macedonia, the Republic of", lat: 41.608635, lon: 21.745275 },
    { code: "MG", name: "Madagascar", lat: -18.766947, lon: 46.869107 },
    { code: "MW", name: "Malawi", lat: -13.254308, lon: 34.301525 },
    { code: "MY", name: "Malaysia", lat: 4.210484, lon: 101.975766 },
    { code: "MV", name: "Maldives", lat: 3.202778, lon: 73.22068 },
    { code: "ML", name: "Mali", lat: 17.570692, lon: -3.996166 },
    { code: "MT", name: "Malta", lat: 35.937496, lon: 14.375416 },
    { code: "MH", name: "Marshall Islands", lat: 7.131474, lon: 171.184478 },
    { code: "MQ", name: "Martinique", lat: 14.641528, lon: -61.024174 },
    { code: "MR", name: "Mauritania", lat: 21.00789, lon: -10.940835 },
    { code: "MU", name: "Mauritius", lat: -20.348404, lon: 57.552152 },
    { code: "YT", name: "Mayotte", lat: -12.8275, lon: 45.166244 },
    { code: "MX", name: "Mexico", lat: 23.634501, lon: -102.552784 },
    { code: "FM", name: "Micronesia", lat: 7.425554, lon: 150.550812 },
    { code: "MD", name: "Moldova", lat: 47.411631, lon: 28.369885 },
    { code: "MC", name: "Monaco", lat: 43.750298, lon: 7.41284 },
    { code: "MN", name: "Mongolia", lat: 46.862496, lon: 103.846656 },
    { code: "ME", name: "Montenegro", lat: 42.708678, lon: 19.37439 },
    { code: "MS", name: "Montserrat", lat: 16.742498, lon: -62.187366 },
    { code: "MA", name: "Morocco", lat: 31.791702, lon: -7.09262 },
    { code: "MZ", name: "Mozambique", lat: -18.665695, lon: 35.529562 },
    { code: "MM", name: "Myanmar", lat: 21.913965, lon: 95.956223 },
    { code: "NA", name: "Namibia", lat: -22.95764, lon: 18.49041 },
    { code: "NR", name: "Nauru", lat: -0.522778, lon: 166.931503 },
    { code: "NP", name: "Nepal", lat: 28.394857, lon: 84.124008 },
    { code: "NL", name: "Netherlands", lat: 52.132633, lon: 5.291266, flag: require("./img/512px-Flag_of_the_Netherlands.png"), emoji: "🇳🇱" },
    { code: "NC", name: "New Caledonia", lat: -20.904305, lon: 165.618042 },
    { code: "NZ", name: "New Zealand", lat: -40.900557, lon: 174.885971 },
    { code: "NI", name: "Nicaragua", lat: 12.865416, lon: -85.207229 },
    { code: "NE", name: "Niger", lat: 17.607789, lon: 8.081666 },
    { code: "NG", name: "Nigeria", lat: 9.081999, lon: 8.675277 },
    { code: "NU", name: "Niue", lat: -19.054445, lon: -169.867233 },
    { code: "NF", name: "Norfolk Island", lat: -29.040835, lon: 167.954712 },
    { code: "MP", name: "Northern Mariana Islands", lat: 17.33083, lon: 145.38469 },
    { code: "NO", name: "Norway", lat: 60.472024, lon: 8.468946 },
    { code: "OM", name: "Oman", lat: 21.512583, lon: 55.923255 },
    { code: "PK", name: "Pakistan", lat: 30.375321, lon: 69.345116 },
    { code: "PW", name: "Palau", lat: 7.51498, lon: 134.58252 },
    { code: "PS", name: "Palestine, State of", lat: 31.952162, lon: 35.233154 },
    { code: "PA", name: "Panama", lat: 8.537981, lon: -80.782127 },
    { code: "PG", name: "Papua New Guinea", lat: -6.314993, lon: 143.95555 },
    { code: "PY", name: "Paraguay", lat: -23.442503, lon: -58.443832 },
    { code: "PE", name: "Peru", lat: -9.189967, lon: -75.015152 },
    { code: "PH", name: "Philippines", lat: 12.879721, lon: 121.774017 },
    { code: "PN", name: "Pitcairn", lat: -24.703615, lon: -127.439308 },
    { code: "PL", name: "Poland", lat: 51.919438, lon: 19.145136 },
    { code: "PT", name: "Portugal", lat: 39.399872, lon: -8.224454 },
    { code: "PR", name: "Puerto Rico", lat: 18.220833, lon: -66.590149 },
    { code: "QA", name: "Qatar", lat: 25.354826, lon: 51.183884 },
    { code: "RE", name: "R\u00e9union", lat: -21.115141, lon: 55.536384 },
    { code: "RO", name: "Romania", lat: 45.943161, lon: 24.96676 },
    { code: "RU", name: "Russian Federation", lat: 61.52401, lon: 105.318756 },
    { code: "RW", name: "Rwanda", lat: -1.940278, lon: 29.873888 },
    // { code: "BL", name: "Saint Barth\u00e9lemy" },
    { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha", lat: -24.143474, lon: -10.030696 },
    { code: "KN", name: "Saint Kitts and Nevis", lat: 17.357822, lon: -62.782998 },
    { code: "LC", name: "Saint Lucia", lat: 13.909444, lon: -60.978893 },
    // { code: "MF", name: "Saint Martin (French part)" },
    { code: "PM", name: "Saint Pierre and Miquelon", lat: 46.941936, lon: -56.27111 },
    { code: "VC", name: "Saint Vincent and the Grenadines", lat: 12.984305, lon: -61.287228 },
    { code: "WS", name: "Samoa", lat: -13.759029, lon: -172.104629 },
    { code: "SM", name: "San Marino", lat: 43.94236, lon: 12.457777 },
    { code: "ST", name: "Sao Tome and Principe", lat: 0.18636, lon: 6.613081 },
    { code: "SA", name: "Saudi Arabia", lat: 23.885942, lon: 45.079162 },
    { code: "SN", name: "Senegal", lat: 14.497401, lon: -14.452362 },
    { code: "RS", name: "Serbia", lat: 44.016521, lon: 21.005859 },
    { code: "SC", name: "Seychelles", lat: -4.679574, lon: 55.491977 },
    { code: "SL", name: "Sierra Leone", lat: 8.460555, lon: -11.779889 },
    { code: "SG", name: "Singapore", lat: 1.352083, lon: 103.819836 },
    // { code: "SX", name: "Sint Maarten" },
    { code: "SK", name: "Slovakia", lat: 48.669026, lon: 19.699024 },
    { code: "SI", name: "Slovenia", lat: 46.151241, lon: 14.995463 },
    { code: "SB", name: "Solomon Islands", lat: -9.64571, lon: 160.156194 },
    { code: "SO", name: "Somalia", lat: 5.152149, lon: 46.199616 },
    { code: "ZA", name: "South Africa", lat: -30.559482, lon: 22.937506 },
    { code: "GS", name: "South Georgia and the South Sandwich Islands", lat: -54.429579, lon: -36.587909 },
    { code: "SS", name: "South Sudan", lat: 6.8770, lon: 31.3070 },
    { code: "ES", name: "Spain", lat: 40.463667, lon: -3.74922 },
    { code: "LK", name: "Sri Lanka", lat: 7.873054, lon: 80.771797 },
    { code: "SD", name: "Sudan", lat: 12.862807, lon: 30.217636 },
    { code: "SR", name: "Suriname", lat: 3.919305, lon: -56.027783 },
    { code: "SJ", name: "Svalbard and Jan Mayen", lat: 77.553604, lon: 23.670272 },
    { code: "SZ", name: "Swaziland", lat: -26.522503, lon: 31.465866 },
    { code: "SE", name: "Sweden", lat: 60.128161, lon: 18.643501 },
    { code: "CH", name: "Switzerland", lat: 46.818188, lon: 8.227512 },
    { code: "SY", name: "Syria", lat: 34.802075, lon: 38.996815 },
    { code: "TW", name: "Taiwan", lat: 23.69781, lon: 120.960515 },
    { code: "TJ", name: "Tajikistan", lat: 38.861034, lon: 71.276093 },
    { code: "TZ", name: "Tanzania, United Republic of", lat: -6.369028, lon: 34.888822 },
    { code: "TH", name: "Thailand", lat: 15.870032, lon: 100.992541 },
    { code: "TL", name: "Timor-Leste", lat: -8.874217, lon: 125.727539 },
    { code: "TG", name: "Togo", lat: 8.619543, lon: 0.824782 },
    { code: "TK", name: "Tokelau", lat: -8.967363, lon: -171.855881 },
    { code: "TO", name: "Tonga", lat: -21.178986, lon: -175.198242 },
    { code: "TT", name: "Trinidad and Tobago", lat: 10.691803, lon: -61.222503 },
    { code: "TN", name: "Tunisia", lat: 33.886917, lon: 9.537499 },
    { code: "TR", name: "Turkey", lat: 38.963745, lon: 35.243322 },
    { code: "TM", name: "Turkmenistan", lat: 38.969719, lon: 59.556278 },
    { code: "TC", name: "Turks and Caicos Islands", lat: 21.694025, lon: -71.797928 },
    { code: "TV", name: "Tuvalu", lat: -7.109535, lon: 177.64933 },
    { code: "UG", name: "Uganda", lat: 1.373333, lon: 32.290275 },
    { code: "UA", name: "Ukraine", lat: 48.379433, lon: 31.16558 },
    // { code: "AE", name: "United Arab Emirates", lat: 23.424076, lon: 53.84781, flag: require("./img/512px-Flag_of_the_United_Arab_Emirates.svg.png"), emoji: "🇦🇪" },
    { code: "GB", name: "United Kingdom", lat: 55.378051, lon: -3.435973 },
    { code: "US", name: "United States", lat: 37.09024, lon: -95.712891 },
    // { code: "UM", name: "United States Minor Outlying Islands" },
    { code: "UY", name: "Uruguay", lat: -32.522779, lon: -55.765835 },
    { code: "UZ", name: "Uzbekistan", lat: 41.377491, lon: 64.585262 },
    { code: "VU", name: "Vanuatu", lat: -15.376706, lon: 166.959158 },
    { code: "VE", name: "Venezuela", lat: 6.42375, lon: -66.58973 },
    { code: "VN", name: "Vietnam", lat: 14.058324, lon: 108.277199 },
    { code: "VG", name: "Virgin Islands, British", lat: 18.420695, lon: -64.639968 },
    { code: "VI", name: "Virgin Islands, U.S.", lat: 18.335765, lon: -64.896335 },
    { code: "WF", name: "Wallis and Futuna", lat: -13.768752, lon: -177.156097 },
    { code: "EH", name: "Western Sahara", lat: 24.215527, lon: -12.885834 },
    { code: "YE", name: "Yemen", lat: 15.552727, lon: 48.516388 },
    { code: "ZM", name: "Zambia", lat: -13.133897, lon: 27.849332 },
    { code: "ZW", name: "Zimbabwe", lat: -19.015438, lon: 29.154857 }
]

export default countryList;