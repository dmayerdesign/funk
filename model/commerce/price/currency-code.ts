// https://gist.github.com/Aquazus/1a26a55ba7c38ed0363e0068d389cf30
export const enum CurrencyCode
{
  /** United Arab Emirates Dirham */ AED = 'AED',
  /** Afghanistan Afghani */ AFN = 'AFN',
  /** Albania Lek */ ALL = 'ALL',
  /** Armenia Dram */ AMD = 'AMD',
  /** Netherlands Antilles Guilder */ ANG = 'ANG',
  /** Angola Kwanza */ AOA = 'AOA',
  /** Argentina Peso */ ARS = 'ARS',
  /** Australia Dollar */ AUD = 'AUD',
  /** Aruba Guilder */ AWG = 'AWG',
  /** Azerbaijan New Manat */ AZN = 'AZN',
  /** Bosnia and Herzegovina Convertible Marka */ BAM = 'BAM',
  /** Barbados Dollar */ BBD = 'BBD',
  /** Bangladesh Taka */ BDT = 'BDT',
  /** Bulgaria Lev */ BGN = 'BGN',
  /** Bahrain Dinar */ BHD = 'BHD',
  /** Burundi Franc */ BIF = 'BIF',
  /** Bermuda Dollar */ BMD = 'BMD',
  /** Brunei Darussalam Dollar */ BND = 'BND',
  /** Bolivia Bolíviano */ BOB = 'BOB',
  /** Brazil Real */ BRL = 'BRL',
  /** Bahamas Dollar */ BSD = 'BSD',
  /** Bhutan Ngultrum */ BTN = 'BTN',
  /** Botswana Pula */ BWP = 'BWP',
  /** Belarus Ruble */ BYR = 'BYR',
  /** Belize Dollar */ BZD = 'BZD',
  /** Canada Dollar */ CAD = 'CAD',
  /** Congo/Kinshasa Franc */ CDF = 'CDF',
  /** Switzerland Franc */ CHF = 'CHF',
  /** Chile Peso */ CLP = 'CLP',
  /** China Yuan Renminbi */ CNY = 'CNY',
  /** Colombia Peso */ COP = 'COP',
  /** Costa Rica Colon */ CRC = 'CRC',
  /** Cuba Convertible Peso */ CUC = 'CUC',
  /** Cuba Peso */ CUP = 'CUP',
  /** Cape Verde Escudo */ CVE = 'CVE',
  /** Czech Republic Koruna */ CZK = 'CZK',
  /** Djibouti Franc */ DJF = 'DJF',
  /** Denmark Krone */ DKK = 'DKK',
  /** Dominican Republic Peso */ DOP = 'DOP',
  /** Algeria Dinar */ DZD = 'DZD',
  /** Egypt Pound */ EGP = 'EGP',
  /** Eritrea Nakfa */ ERN = 'ERN',
  /** Ethiopia Birr */ ETB = 'ETB',
  /** Euro Member Countries */ EUR = 'EUR',
  /** Fiji Dollar */ FJD = 'FJD',
  /** Falkland Islands (Malvinas) Pound */ FKP = 'FKP',
  /** United Kingdom Pound */ GBP = 'GBP',
  /** Georgia Lari */ GEL = 'GEL',
  /** Guernsey Pound */ GGP = 'GGP',
  /** Ghana Cedi */ GHS = 'GHS',
  /** Gibraltar Pound */ GIP = 'GIP',
  /** Gambia Dalasi */ GMD = 'GMD',
  /** Guinea Franc */ GNF = 'GNF',
  /** Guatemala Quetzal */ GTQ = 'GTQ',
  /** Guyana Dollar */ GYD = 'GYD',
  /** Hong Kong Dollar */ HKD = 'HKD',
  /** Honduras Lempira */ HNL = 'HNL',
  /** Croatia Kuna */ HRK = 'HRK',
  /** Haiti Gourde */ HTG = 'HTG',
  /** Hungary Forint */ HUF = 'HUF',
  /** Indonesia Rupiah */ IDR = 'IDR',
  /** Israel Shekel */ ILS = 'ILS',
  /** Isle of Man Pound */ IMP = 'IMP',
  /** India Rupee */ INR = 'INR',
  /** Iraq Dinar */ IQD = 'IQD',
  /** Iran Rial */ IRR = 'IRR',
  /** Iceland Krona */ ISK = 'ISK',
  /** Jersey Pound */ JEP = 'JEP',
  /** Jamaica Dollar */ JMD = 'JMD',
  /** Jordan Dinar */ JOD = 'JOD',
  /** Japan Yen */ JPY = 'JPY',
  /** Kenya Shilling */ KES = 'KES',
  /** Kyrgyzstan Som */ KGS = 'KGS',
  /** Cambodia Riel */ KHR = 'KHR',
  /** Comoros Franc */ KMF = 'KMF',
  /** Korea (North) Won */ KPW = 'KPW',
  /** Korea (South) Won */ KRW = 'KRW',
  /** Kuwait Dinar */ KWD = 'KWD',
  /** Cayman Islands Dollar */ KYD = 'KYD',
  /** Kazakhstan Tenge */ KZT = 'KZT',
  /** Laos Kip */ LAK = 'LAK',
  /** Lebanon Pound */ LBP = 'LBP',
  /** Sri Lanka Rupee */ LKR = 'LKR',
  /** Liberia Dollar */ LRD = 'LRD',
  /** Lesotho Loti */ LSL = 'LSL',
  /** Libya Dinar */ LYD = 'LYD',
  /** Morocco Dirham */ MAD = 'MAD',
  /** Moldova Leu */ MDL = 'MDL',
  /** Madagascar Ariary */ MGA = 'MGA',
  /** Macedonia Denar */ MKD = 'MKD',
  /** Myanmar (Burma) Kyat */ MMK = 'MMK',
  /** Mongolia Tughrik */ MNT = 'MNT',
  /** Macau Pataca */ MOP = 'MOP',
  /** Mauritania Ouguiya */ MRO = 'MRO',
  /** Mauritius Rupee */ MUR = 'MUR',
  /** Maldives (Maldive Islands) Rufiyaa */ MVR = 'MVR',
  /** Malawi Kwacha */ MWK = 'MWK',
  /** Mexico Peso */ MXN = 'MXN',
  /** Malaysia Ringgit */ MYR = 'MYR',
  /** Mozambique Metical */ MZN = 'MZN',
  /** Namibia Dollar */ NAD = 'NAD',
  /** Nigeria Naira */ NGN = 'NGN',
  /** Nicaragua Cordoba */ NIO = 'NIO',
  /** Norway Krone */ NOK = 'NOK',
  /** Nepal Rupee */ NPR = 'NPR',
  /** New Zealand Dollar */ NZD = 'NZD',
  /** Oman Rial */ OMR = 'OMR',
  /** Panama Balboa */ PAB = 'PAB',
  /** Peru Sol */ PEN = 'PEN',
  /** Papua New Guinea Kina */ PGK = 'PGK',
  /** Philippines Peso */ PHP = 'PHP',
  /** Pakistan Rupee */ PKR = 'PKR',
  /** Poland Zloty */ PLN = 'PLN',
  /** Paraguay Guarani */ PYG = 'PYG',
  /** Qatar Riyal */ QAR = 'QAR',
  /** Romania New Leu */ RON = 'RON',
  /** Serbia Dinar */ RSD = 'RSD',
  /** Russia Ruble */ RUB = 'RUB',
  /** Rwanda Franc */ RWF = 'RWF',
  /** Saudi Arabia Riyal */ SAR = 'SAR',
  /** Solomon Islands Dollar */ SBD = 'SBD',
  /** Seychelles Rupee */ SCR = 'SCR',
  /** Sudan Pound */ SDG = 'SDG',
  /** Sweden Krona */ SEK = 'SEK',
  /** Singapore Dollar */ SGD = 'SGD',
  /** Saint Helena Pound */ SHP = 'SHP',
  /** Sierra Leone Leone */ SLL = 'SLL',
  /** Somalia Shilling */ SOS = 'SOS',
  /** Seborga Luigino */ SPL = 'SPL',
  /** Suriname Dollar */ SRD = 'SRD',
  /** São Tomé and Príncipe Dobra */ STD = 'STD',
  /** El Salvador Colon */ SVC = 'SVC',
  /** Syria Pound */ SYP = 'SYP',
  /** Swaziland Lilangeni */ SZL = 'SZL',
  /** Thailand Baht */ THB = 'THB',
  /** Tajikistan Somoni */ TJS = 'TJS',
  /** Turkmenistan Manat */ TMT = 'TMT',
  /** Tunisia Dinar */ TND = 'TND',
  /** Tonga Pa'anga */ TOP = 'TOP',
  /** Turkey Lira */ TRY = 'TRY',
  /** Trinidad and Tobago Dollar */ TTD = 'TTD',
  /** Tuvalu Dollar */ TVD = 'TVD',
  /** Taiwan New Dollar */ TWD = 'TWD',
  /** Tanzania Shilling */ TZS = 'TZS',
  /** Ukraine Hryvnia */ UAH = 'UAH',
  /** Uganda Shilling */ UGX = 'UGX',
  /** United States Dollar */ USD = 'USD',
  /** Uruguay Peso */ UYU = 'UYU',
  /** Uzbekistan Som */ UZS = 'UZS',
  /** Venezuela Bolivar */ VEF = 'VEF',
  /** Viet Nam Dong */ VND = 'VND',
  /** Vanuatu Vatu */ VUV = 'VUV',
  /** Samoa Tala */ WST = 'WST',
  /** Communauté Financière Africaine (BEAC) CFA Franc BEAC */ XAF = 'XAF',
  /** East Caribbean Dollar */ XCD = 'XCD',
  /** International Monetary Fund (IMF) Special Drawing Rights */ XDR = 'XDR',
  /** Communauté Financière Africaine (BCEAO) Franc */ XOF = 'XOF',
  /** Comptoirs Français du Pacifique (CFP) Franc */ XPF = 'XPF',
  /** Yemen Rial */ YER = 'YER',
  /** South Africa Rand */ ZAR = 'ZAR',
  /** Zambia Kwacha */ ZMW = 'ZMW',
  /** Zimbabwe Dollar */ ZWD = 'ZWD',
}
