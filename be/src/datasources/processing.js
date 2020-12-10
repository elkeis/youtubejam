const {
    storage,
    insertProcessing,
} = require('./storage');


module.exports = {
    insertProcessing,
    
    async findProcessing(id) {
        return storage.processings.find(p => p.id === id);
    },

    async updateProcessing(id, updateSet) {
        const processing = storage.processings.find(p => p.id === id);
        Object.keys(updateSet).forEach(k => {
            processing[k] = updateSet[k];
        });
        return processing;
    }
}