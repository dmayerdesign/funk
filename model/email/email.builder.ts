import { EmailOptions, EmailStyleOptions } from './email-options'

export class EmailBuilder
{

    private _baseOptions?: Partial<EmailOptions>
    private _html?: string
    private _data?: any
    private _styles: EmailStyleOptions = {
        mastheadBgColor: '#00b0ff',
        accentColor: '#ff3c7c',
        fontFamily: 'Montserrat',
        innerBgColor: '#fdfdfd',
    }

    public setOptions(options?: Partial<EmailOptions>): this
    {
        this._baseOptions = options
        return this
    }

    public setData(data: any): this
    {
        this._data = data
        return this
    }

    public setHtml(pugModule: (options: EmailOptions) => string): this
    {
        this._html = pugModule({
            ...this._baseOptions,
            ...this._styles,
            ...this._data,
        })
        return this
    }

    public patchStyles(styles: EmailStyleOptions): this
    {
        this._styles = { ...this._styles, ...styles }
        return this
    }

    public get sendEmailOptions(): EmailOptions
    {
        return {
            ...this._baseOptions,
            html: this._html,
        } as EmailOptions
    }
}
