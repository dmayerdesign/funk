export enum LengthUnit {
    Inches = 'in',
    Centimeters = 'cm',
    Millimeters = 'mm',
    Feet = 'ft',
    Meters = 'm',
    Yards = 'yd',
}

export enum WeightUnit {
    Grams = 'g',
    Kilograms = 'kg',
    Ounces = 'oz',
    Pounds = 'lb',
}

export interface Units {
    weight: WeightUnit
    length: LengthUnit
}
