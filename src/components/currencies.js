const currencies = [
  { code: "AED", label: "United Arab Emirates Dirham" },
  { code: "AFN", label: "Afghan Afghani" },
  { code: "ALL", label: "Albanian Lek" },
  { code: "AMD", label: "Armenian Dram" },
  { code: "ANG", label: "Netherlands Antillean Guil der" },
  { code: "AOA", label: "Angolan Kwanza" },
  { code: "ARS", label: "Argentine Peso" },
  { code: "AUD", label: "Australian Dollar" },
  { code: "AWG", label: "Aruban Florin" },
  { code: "AZN", label: "Azerbaijani Manat" },
  { code: "BAM", label: "Bosnia-Herzegovina Convertible Mark" },
  { code: "BBD", label: "Barbadian Dollar" },
  { code: "BDT", label: "Bangladeshi Taka" },
  { code: "BGN", label: "Bulgarian Lev" },
  { code: "BHD", label: "Bahraini Dinar" },
  { code: "BIF", label: "Burundian Franc" },
  { code: "BMD", label: "Bermudan Dollar" },
  { code: "BND", label: "Brunei Dollar" },
  { code: "BOB", label: "Bolivian Boliviano" },
  { code: "BOV", label: "Bolivian Mvdol" },
  { code: "BRL", label: "Brazilian Real" },
  { code: "BSD", label: "Bahamian Dollar" },
  { code: "BTN", label: "Bhutanese Ngultrum" },
  { code: "BWP", label: "Botswanan Pula" },
  { code: "BYN", label: "Belarusian Ruble" },
  { code: "BZD", label: "Belize Dollar" },
  { code: "CAD", label: "Canadian Dollar" },
  { code: "CDF", label: "Congolese Franc" },
  { code: "CHE", label: "WIR Euro" },
  { code: "CHF", label: "Swiss Franc" },
  { code: "CHW", label: "WIR Franc" },
  { code: "CLF", label: "Chilean Unit of Account (UF)" },
  { code: "CLP", label: "Chilean Peso" },
  { code: "CNH", label: "Chinese Yuan (offshore)" },
  { code: "CNY", label: "Chinese Yuan" },
  { code: "COP", label: "Colombian Peso" },
  { code: "COU", label: "Colombian Real Value Unit" },
  { code: "CRC", label: "Costa Rican Colón" },
  { code: "CUC", label: "Cuban Convertible Peso" },
  { code: "CUP", label: "Cuban Peso" },
  { code: "CVE", label: "Cape Verdean Escudo" },
  { code: "CZK", label: "Czech Koruna" },
  { code: "DJF", label: "Djiboutian Franc" },
  { code: "DKK", label: "Danish Krone" },
  { code: "DOP", label: "Dominican Peso" },
  { code: "DZD", label: "Algerian Dinar" },
  { code: "EGP", label: "Egyptian Pound" },
  { code: "ERN", label: "Eritrean Nakfa" },
  { code: "ETB", label: "Ethiopian Birr" },
  { code: "EUR", label: "Euro" },
  { code: "FJD", label: "Fijian Dollar" },
  { code: "FKP", label: "Falkland Islands Pound" },
  { code: "GBP", label: "British Pound" },
  { code: "GEL", label: "Georgian Lari" },
  { code: "GHS", label: "Ghanaian Cedi" },
  { code: "GIP", label: "Gibraltar Pound" },
  { code: "GMD", label: "Gambian Dalasi" },
  { code: "GNF", label: "Guinean Franc" },
  { code: "GTQ", label: "Guatemalan Quetzal" },
  { code: "GYD", label: "Guyanaese Dollar" },
  { code: "HKD", label: "Hong Kong Dollar" },
  { code: "HNL", label: "Honduran Lempira" },
  { code: "HRK", label: "Croatian Kuna" },
  { code: "HTG", label: "Haitian Gourde" },
  { code: "HUF", label: "Hungarian Forint" },
  { code: "IDR", label: "Indonesian Rupiah" },
  { code: "ILS", label: "Israeli New Shekel" },
  { code: "INR", label: "Indian Rupee" },
  { code: "IQD", label: "Iraqi Dinar" },
  { code: "IRR", label: "Iranian Rial" },
  { code: "ISK", label: "Icelandic Króna" },
  { code: "JMD", label: "Jamaican Dollar" },
  { code: "JOD", label: "Jordanian Dinar" },
  { code: "JPY", label: "Japanese Yen" },
  { code: "KES", label: "Kenyan Shilling" },
  { code: "KGS", label: "Kyrgystani Som" },
  { code: "KHR", label: "Cambodian Riel" },
  { code: "KMF", label: "Comorian Franc" },
  { code: "KPW", label: "North Korean Won" },
  { code: "KRW", label: "South Korean Won" },
  { code: "KWD", label: "Kuwaiti Dinar" },
  { code: "KYD", label: "Cayman Islands Dollar" },
  { code: "KZT", label: "Kazakhstani Tenge" },
  { code: "LAK", label: "Laotian Kip" },
  { code: "LBP", label: "Lebanese Pound" },
  { code: "LKR", label: "Sri Lankan Rupee" },
  { code: "LRD", label: "Liberian Dollar" },
  { code: "LSL", label: "Lesotho Loti" },
  { code: "LYD", label: "Libyan Dinar" },
  { code: "MAD", label: "Moroccan Dirham" },
  { code: "MDL", label: "Moldovan Leu" },
  { code: "MGA", label: "Malagasy Ariary" },
  { code: "MKD", label: "Macedonian Denar" },
  { code: "MMK", label: "Myanmar Kyat" },
  { code: "MNT", label: "Mongolian Tugrik" },
  { code: "MOP", label: "Macanese Pataca" },
  { code: "MRO", label: "Mauritanian Ouguiya" },
  { code: "MUR", label: "Mauritian Rupee" },
  { code: "MWK", label: "Malawian Kwacha" },
  { code: "MXN", label: "Mexican Peso" },
  { code: "MXV", label: "Mexican Investment Unit" },
  { code: "MYR", label: "Malaysian Ringgit" },
  { code: "MZN", label: "Mozambican Metical" },
  { code: "NAD", label: "Namibian Dollar" },
  { code: "NGN", label: "Nigerian Naira" },
  { code: "NIO", label: "Nicaraguan Córdoba" },
  { code: "NOK", label: "Norwegian Krone" },
  { code: "NPR", label: "Nepalese Rupee" },
  { code: "NZD", label: "New Zealand Dollar" },
  { code: "OMR", label: "Omani Rial" },
  { code: "PAB", label: "Panamanian Balboa" },
  { code: "PEN", label: "Peruvian Sol" },
  { code: "PGK", label: "Papua New Guinean Kina" },
  { code: "PHP", label: "Philippine Piso" },
  { code: "PKR", label: "Pakistani Rupee" },
  { code: "PLN", label: "Polish Zloty" },
  { code: "PYG", label: "Paraguayan Guarani" },
  { code: "QAR", label: "Qatari Rial" },
  { code: "RON", label: "Romanian Leu" },
  { code: "RSD", label: "Serbian Dinar" },
  { code: "RUB", label: "Russian Ruble" },
  { code: "RWF", label: "Rwandan Franc" },
  { code: "SAR", label: "Saudi Riyal" },
  { code: "SBD", label: "Solomon Islands Dollar" },
  { code: "SCR", label: "Seychellois Rupee" },
  { code: "SDG", label: "Sudanese Pound" },
  { code: "SEK", label: "Swedish Krona" },
  { code: "SGD", label: "Singapore Dollar" },
  { code: "SHP", label: "St. Helena Pound" },
  { code: "SLL", label: "Sierra Leonean Leone" },
  { code: "SOS", label: "Somali Shilling" },
  { code: "SRD", label: "Surinamese Dollar" },
  { code: "SSP", label: "South Sudanese Pound" },
  { code: "STN", label: "São Tomé & Príncipe Dobra (2018)" },
  { code: "SYP", label: "Syrian Pound" },
  { code: "SZL", label: "Swazi Lilangeni" },
  { code: "THB", label: "Thai Baht" },
  { code: "TJS", label: "Tajikistani Somoni" },
  { code: "TND", label: "Tunisian Dinar" },
  { code: "TOP", label: "Tongan Paʻanga" },
  { code: "TRY", label: "Turkish Lira" },
  { code: "TTD", label: "Trinidad & Tobago Dollar" },
  { code: "TWD", label: "New Taiwan Dollar" },
  { code: "TZS", label: "Tanzanian Shilling" },
  { code: "UAH", label: "Ukrainian Hryvnia" },
  { code: "UGX", label: "Ugandan Shilling" },
  { code: "USD", label: "US Dollar" },
  { code: "UYI", label: "Uruguayan Peso (Indexed Units)" },
  { code: "UYU", label: "Uruguayan Peso" },
  { code: "UZS", label: "Uzbekistani Som" },
  { code: "VEF", label: "Venezuelan Bolívar" },
  { code: "VND", label: "Vietnamese Dong" },
  { code: "VUV", label: "Vanuatu Vatu" },
  { code: "WST", label: "Samoan Tala" },
  { code: "XAF", label: "Central African CFA Franc" },
  { code: "XCD", label: "East Caribbean Dollar" },
  { code: "XOF", label: "West African CFA Franc" },
  { code: "XPF", label: "CFP Franc" },
  { code: "YER", label: "Yemeni Rial" },
  { code: "ZAR", label: "South African Rand" },
  { code: "ZMW", label: "Zambian Kwacha" },
];

export default currencies;
