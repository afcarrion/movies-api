function buildMessage(entity, action){
    if(action === "List"){
        return `${entity}s ${action}ed`;
    }
    return `${entity} ${action}d`;
}

module.exports = buildMessage;