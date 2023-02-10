//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract EventContract {
    event buyticketSuccesuflly(address _from, uint256 _ticket); 
    event EventCreatedSuccessfully(address _from,string _name,uint256 _date,uint256 _price); 
    event EnteredEventSuccessfully(uint256 _eventId,bool _status); 

    /*
    * An Event Struct which will store information regarding the event which user will create.
    */
    struct Event {
        address organizer;
        string name;
        uint256 date;
        uint256 price;
        uint256 ticketCount;
        uint256 ticketRemain;
    }

    /* 
    * A ticket struct which will store the information about the ticket 
    */
    struct Ticket {
        uint256 eventId;
        bool ticketStatus;
    }

    /*
    * This mapping will store the events for a particular eventId.
    */
    mapping(uint256 => Event) public events;

    /*
    * This mapping will store the number of tickets for a particular user for particular eventId.
    */
    mapping(address => mapping(uint256 => uint256)) public tickets;

    /*
    * this mapping will store the Ticket struct array for a particular user for a particular eventID.
    */
    mapping(address => mapping(uint256 => Ticket[])) public enteredEvent;

/*
    * A variable which will keep track of the events created.
    * A variable which will keep track of the owner.
    * A constructor which will intialized the owner when contract runs.
*/
    uint256 public nextId;
    address public owner;
    constructor(){
      owner = msg.sender;
    }

    /*
    * @devs: This function will create events with the params check for the date and ticket count and then save the,
             * event in the event mapping and emit the event .
    * @params: name,date,price,ticketCount.
    */
    function createEvent(
        string memory name,
        uint256 date,
        uint256 price,
        uint256 ticketCount
    ) external {
        require(date > block.timestamp,"You can organize event for future date");
        require(ticketCount > 0,"You can organize event only if you create more than 0 tickets");
        nextId++;
        events[nextId] = Event(
            msg.sender,
            name,
            date,
            price,
            ticketCount,
            ticketCount
        );
        emit EventCreatedSuccessfully(msg.sender, name,date,price);
    }

    /*
    *@devs: This function will but the ticket for a particular event id and number of tickets that user wants to buy,
            * Then do all the checks which is required, then it will subtract the amount of ticket from the event mapping and add those amount of tickets to ticket mapping ,
            * And then a for loop is triggred which will add the Tickets to the enteredEvent mapping with the status as false.
            * And the event is then emitted.

    *@params: eventid, number of tickets.
    */
    function buyTicket(uint256 id, uint256 quantity) external payable {
        require(events[id].date != 0, "Event does not exist");
        require(events[id].date > block.timestamp, "Event has already occured");
        Event storage _event = events[id];
        require(msg.value == (_event.price * quantity), "Ether is not enough");
        require(_event.ticketRemain >= quantity, "Not enough tickets");
        _event.ticketRemain -= quantity;
        tickets[msg.sender][id] += quantity;
        for (uint256 i = 1; i <= quantity; i++) {
            enteredEvent[msg.sender][id].push(Ticket(id, false));
        }
        emit buyticketSuccesuflly(msg.sender, quantity);
    }

    /*
    *@devs:This function will check if the user is entered into the event or not , a boolean variable check is intialized to false,
           * Then a for loop will get triggred which will check the status of the ticket if its false the check will be true.
           * And if the check is false it will show that the ticket is used.
           * Then again a for loop will get triggred then it will check the status of the ticket if it is false change it to true.
           * and atlast the event will get emitted and status will be return as true. 
    *@params:EventId
    */
    function enterEvent(uint256 _eventId) external returns (bool status) {
        bool check = false;
        uint256 arrayLength = enteredEvent[msg.sender][_eventId].length;
        for (uint256 i = 0;i < arrayLength;i++) {
            if (enteredEvent[msg.sender][_eventId][i].ticketStatus == false) {
                check = true;
                break;
            }
        }
        require(check, "Your ticket used.");
        for (uint256 i = 0;i < arrayLength;i++) {
            if (enteredEvent[msg.sender][_eventId][i].ticketStatus == false) {
                enteredEvent[msg.sender][_eventId][i].ticketStatus = true;
            }
        }
        emit EnteredEventSuccessfully(_eventId, status);
        return status = true;
    }
}
