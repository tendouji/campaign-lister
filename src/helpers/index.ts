const convertToCurrency = (num: number) => Number(num).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

const compareObject = (obj1: any, obj2: any) => {
    // NOTE: sort the object by key first before comparing
    const _obj1 = sortObjectByKey(obj1);
    const _obj2 = sortObjectByKey(obj2);

    return (JSON.stringify(_obj1) === JSON.stringify(_obj2));
};

const sortObjectByKey = (obj: any) => {
    const sorted:any = {};
    Object.keys(obj).sort().forEach((key) => {
        sorted[key] = obj[key];
    });

    return sorted;
};


const sortArrayByObjectKeyValue = (objArr: any, key: string) => {
    objArr.sort((a: any, b: any) => {
        const keyA = a[key];
        const keyB = b[key];
        if(keyA > keyB) return 1;
        if(keyA < keyB) return -1;
        return 0;
    });
};

const beautifyDate = (date: Date) => {
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthArr[month].substr(0, 3) + ' ' + year;
};

export {
    convertToCurrency,
    compareObject,
    sortArrayByObjectKeyValue,
    beautifyDate,
}