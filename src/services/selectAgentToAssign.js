const selectAgentToAssign = (agents, lastAssignedAgentId, shiftSchedule) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let currentlyAvailableAgents = [];

    //first select the agents available at the current hour
    for (let agent in agents){
        const agentShiftLimits = shiftSchedule[agents[agent].name].split('-');

        //check if the agent works at the moment with 30 minute offset (so agent working till 5pm will get the tickets assigned till 4:30pm) - if yes then push him to the array
        if (agentShiftLimits[0] < currentHour && (agentShiftLimits[1] > currentHour || (agentShiftLimits[1] === currentHour &&  currentMinute < 30))) currentlyAvailableAgents.push(agents[agent].id);
    }

    //then select the agent that should get the ticket assigned
    console.log(`last assigned = ${lastAssignedAgentId}`)
    console.log(`all avaiable = ${currentlyAvailableAgents}`)
    
    for (let agent in currentlyAvailableAgents){
        if (currentlyAvailableAgents[agent] > lastAssignedAgentId)
            return currentlyAvailableAgents[agent]
        }
    
    return currentlyAvailableAgents[0];
}

export default selectAgentToAssign;