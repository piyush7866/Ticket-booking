//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;


contract EventContract {
 struct Event{
   address organizer;
   string name;
   uint date; 
   uint price;
   uint ticketCount;  
   uint ticketRemain;
 }

 Event[] Events;
 address payable owner;

 constructor(){
    owner = payable(msg.sender);
 }

 mapping(uint=>Event) public events;
 mapping(address=>mapping(uint=>uint)) public tickets;
 uint public nextId;
 


 function createEvent(string memory name,uint date,uint price,uint ticketCount) external{
   require(date>block.timestamp);
   require(ticketCount>0);
   events[nextId] = Event(msg.sender,name,date,price,ticketCount,ticketCount);
   Events.push(events[nextId]);
   nextId++;
 }

 function getEvent() public view returns(Event[] memory){
    return Events;
 }

 function buyTicket(uint id,uint quantity) external payable{
   require(events[id].date!=0);
   require(events[id].date>block.timestamp);
   Event storage _event = events[id];
   require(msg.value==(_event.price*quantity));
   require(_event.ticketRemain>=quantity);
   _event.ticketRemain-=quantity;
   tickets[msg.sender][id]+=quantity;


 }
 function transferTicket(uint id,uint quantity,address to) external{
   require(events[id].date!=0);
   require(events[id].date>block.timestamp);
   require(tickets[msg.sender][id]>=quantity);
   tickets[msg.sender][id]-=quantity;
   tickets[to][id]+=quantity;
 }
}