//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract EventContract {
    event buyticketSuccesuflly(address _from, uint256 _ticket);
    event EventCreatedSuccessfully(address _from,string _name,uint256 _date,uint256 _price);
    event EnteredEventSuccessfully(uint256 _eventId,bool _status);
    struct Event {
        address organizer;
        string name;
        uint256 date;
        uint256 price;
        uint256 ticketCount;
        uint256 ticketRemain;
    }

    struct Ticket {
        uint256 eventId;
        bool ticketStatus;
    }

    mapping(uint256 => Event) public events;
    mapping(address => mapping(uint256 => uint256)) public tickets;
    mapping(address => mapping(uint256 => Ticket[])) public enteredEvent;
    uint256 public nextId;

    function createEvent(
        string memory name,
        uint256 date,
        uint256 price,
        uint256 ticketCount
    ) external {
        require(
            date > block.timestamp,
            "You can organize event for future date"
        );
        require(
            ticketCount > 0,
            "You can organize event only if you create more than 0 tickets"
        );

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

    function EnterEvent(uint256 _eventId) external returns (bool status) {
        bool check = false;
        for (
            uint256 i = 0;
            i < enteredEvent[msg.sender][_eventId].length;
            i++
        ) {
            if (enteredEvent[msg.sender][_eventId][i].ticketStatus == false) {
                check = true;
                break;
            }
        }
        require(check, "Your ticket used.");
        for (
            uint256 i = 0;
            i < enteredEvent[msg.sender][_eventId].length;
            i++
        ) {
            if (enteredEvent[msg.sender][_eventId][i].ticketStatus == false) {
                enteredEvent[msg.sender][_eventId][i].ticketStatus = true;
            }
        }
        emit EnteredEventSuccessfully(_eventId, status);
        return status = true;
    }
}
