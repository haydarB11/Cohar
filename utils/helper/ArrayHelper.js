module.exports = {

    UniqueValuesFromArrayOfJson(arr) {
        let outputArray = arr.filter((obj, index, self) => {
            return index === self.findIndex((o) => {
                return o.id === obj.id;
            });
        });
    
        return outputArray;
    }
    
}
