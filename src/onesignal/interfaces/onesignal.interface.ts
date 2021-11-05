// tslint:disable-next-line: max-classes-per-file
export class ContentMessageOneSignalJSON{
    en: string;
    es: string;
}

// tslint:disable-next-line: max-classes-per-file
export class HeaderMessageOneSignalJSON{
    en: string;
    es: string;
}

// tslint:disable-next-line: max-classes-per-file
export class MessageOneSignalJSON{
    data?: Object;
    contents: ContentMessageOneSignalJSON;
    headings: HeaderMessageOneSignalJSON;
}
// tslint:disable-next-line: max-classes-per-file
export class MessageGroupOneSignalJSON extends MessageOneSignalJSON{
    includePlayerIds: string[];
}


// tslint:disable-next-line: max-classes-per-file
export class MessageBrowserOneSignalJSON{
    contents: ContentMessageOneSignalJSON;
    headings: HeaderMessageOneSignalJSON;
    url: string;
    chromeWebImage: string;
}

// tslint:disable-next-line: max-classes-per-file
export class MessageBrowserGroupOneSignalJSON extends MessageBrowserOneSignalJSON{
    includePlayerIds: string[];
}
