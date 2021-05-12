import React, { useState } from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messsages-esp'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es');
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    // TODO: Leer los eventos.
    const { events, activeEvent } = useSelector(state => state.calendar)

    const [LastView, setLastView] = useState( localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) );
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );    
    }


    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable= {true}
                view={ LastView }
                components={ {
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            {
                ( activeEvent ) && <DeleteEventFab />
            }
            

            <CalendarModal />
        </div>
    )
}