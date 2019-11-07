const convertToCurrency = (num: number) => Number(num).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

const compareObject = (obj1: any, obj2: any) => {
    // Note: sort the object by key first before comparing
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

export {
    convertToCurrency,
    compareObject
}