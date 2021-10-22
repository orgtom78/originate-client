const currencies = [
  { label: "United Arab Emirates Dirham" },
  { label: "Afghan Afghani" },
  { label: "Albanian Lek" },
  { label: "Armenian Dram" },
  { label: "Netherlands Antillean Guil der" },
  { label: "Angolan Kwanza" },
  { label: "Argentine Peso" },
  { label: "Australian Dollar" },
  { label: "Aruban Florin" },
  { label: "Azerbaijani Manat" },
  { label: "Bosnia-Herzegovina Convertible Mark" },
  { label: "Barbadian Dollar" },
  { label: "Bangladeshi Taka" },
  { label: "Bulgarian Lev" },
  { label: "Bahraini Dinar" },
  { label: "Burundian Franc" },
  { label: "Bermudan Dollar" },
  { label: "Brunei Dollar" },
  { label: "Bolivian Boliviano" },
  { label: "Bolivian Mvdol" },
  { label: "Brazilian Real" },
  { label: "Bahamian Dollar" },
  { label: "Bhutanese Ngultrum" },
  { label: "Botswanan Pula" },
  { label: "Belarusian Ruble" },
  { label: "Belize Dollar" },
  { label: "Canadian Dollar" },
  { label: "Congolese Franc" },
  { label: "WIR Euro" },
  { label: "Swiss Franc" },
  { label: "WIR Franc" },
  { label: "Chilean Unit of Account (UF)" },
  { label: "Chilean Peso" },
  { label: "Chinese Yuan (offshore)" },
  { label: "Chinese Yuan" },
  { label: "Colombian Peso" },
  { label: "Colombian Real Value Unit" },
  { label: "Costa Rican Colón" },
  { label: "Cuban Convertible Peso" },
  { label: "Cuban Peso" },
  { label: "Cape Verdean Escudo" },
  { label: "Czech Koruna" },
  { label: "Djiboutian Franc" },
  { label: "Danish Krone" },
  { label: "Dominican Peso" },
  { label: "Algerian Dinar" },
  { label: "Egyptian Pound" },
  { label: "Eritrean Nakfa" },
  { label: "Ethiopian Birr" },
  { label: "Euro" },
  { label: "Fijian Dollar" },
  { label: "Falkland Islands Pound" },
  { label: "British Pound" },
  { label: "Georgian Lari" },
  { label: "Ghanaian Cedi" },
  { label: "Gibraltar Pound" },
  { label: "Gambian Dalasi" },
  { label: "Guinean Franc" },
  { label: "Guatemalan Quetzal" },
  { label: "Guyanaese Dollar" },
  { label: "Hong Kong Dollar" },
  { label: "Honduran Lempira" },
  { label: "Croatian Kuna" },
  { label: "Haitian Gourde" },
  { label: "Hungarian Forint" },
  { label: "Indonesian Rupiah" },
  { label: "Israeli New Shekel" },
  { label: "Indian Rupee" },
  { label: "Iraqi Dinar" },
  { label: "Iranian Rial" },
  { label: "Icelandic Króna" },
  { label: "Jamaican Dollar" },
  { label: "Jordanian Dinar" },
  { label: "Japanese Yen" },
  { label: "Kenyan Shilling" },
  { label: "Kyrgystani Som" },
  { label: "Cambodian Riel" },
  { label: "Comorian Franc" },
  { label: "North Korean Won" },
  { label: "South Korean Won" },
  { label: "Kuwaiti Dinar" },
  { label: "Cayman Islands Dollar" },
  { label: "Kazakhstani Tenge" },
  { label: "Laotian Kip" },
  { label: "Lebanese Pound" },
  { label: "Sri Lankan Rupee" },
  { label: "Liberian Dollar" },
  { label: "Lesotho Loti" },
  { label: "Libyan Dinar" },
  { label: "Moroccan Dirham" },
  { label: "Moldovan Leu" },
  { label: "Malagasy Ariary" },
  { label: "Macedonian Denar" },
  { label: "Myanmar Kyat" },
  { label: "Mongolian Tugrik" },
  { label: "Macanese Pataca" },
  { label: "Mauritanian Ouguiya" },
  { label: "Mauritian Rupee" },
  { label: "Malawian Kwacha" },
  { label: "Mexican Peso" },
  { label: "Mexican Investment Unit" },
  { label: "Malaysian Ringgit" },
  { label: "Mozambican Metical" },
  { label: "Namibian Dollar" },
  { label: "Nigerian Naira" },
  { label: "Nicaraguan Córdoba" },
  { label: "Norwegian Krone" },
  { label: "Nepalese Rupee" },
  { label: "New Zealand Dollar" },
  { label: "Omani Rial" },
  { label: "Panamanian Balboa" },
  { label: "Peruvian Sol" },
  { label: "Papua New Guinean Kina" },
  { label: "Philippine Piso" },
  { label: "Pakistani Rupee" },
  { label: "Polish Zloty" },
  { label: "Paraguayan Guarani" },
  { label: "Qatari Rial" },
  { label: "Romanian Leu" },
  { label: "Serbian Dinar" },
  { label: "Russian Ruble" },
  { label: "Rwandan Franc" },
  { label: "Saudi Riyal" },
  { label: "Solomon Islands Dollar" },
  { label: "Seychellois Rupee" },
  { label: "Sudanese Pound" },
  { label: "Swedish Krona" },
  { label: "Singapore Dollar" },
  { label: "St. Helena Pound" },
  { label: "Sierra Leonean Leone" },
  { label: "Somali Shilling" },
  { label: "Surinamese Dollar" },
  { label: "South Sudanese Pound" },
  { label: "São Tomé & Príncipe Dobra (2018)" },
  { label: "Syrian Pound" },
  { label: "Swazi Lilangeni" },
  { label: "Thai Baht" },
  { label: "Tajikistani Somoni" },
  { label: "Tunisian Dinar" },
  { label: "Tongan Paʻanga" },
  { label: "Turkish Lira" },
  { label: "Trinidad & Tobago Dollar" },
  { label: "New Taiwan Dollar" },
  { label: "Tanzanian Shilling" },
  { label: "Ukrainian Hryvnia" },
  { label: "Ugandan Shilling" },
  { label: "US Dollar" },
  { label: "Uruguayan Peso (Indexed Units)" },
  { label: "Uruguayan Peso" },
  { label: "Uzbekistani Som" },
  { label: "Venezuelan Bolívar" },
  { label: "Vietnamese Dong" },
  { label: "Vanuatu Vatu" },
  { label: "Samoan Tala" },
  { label: "Central African CFA Franc" },
  { label: "East Caribbean Dollar" },
  { label: "West African CFA Franc" },
  { label: "CFP Franc" },
  { label: "Yemeni Rial" },
  { label: "South African Rand" },
  { label: "Zambian Kwacha" },
];

export default currencies;