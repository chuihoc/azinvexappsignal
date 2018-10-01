import { toastr } from 'react-redux-toastr';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

import moment from 'moment';
import axios from 'axios';
export const API_URL = 'http://api.azinvex.com/api/';

export const createSignal = (currentUser, signal) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(asyncActionStart());
    const { symbol, type, stoploss, takeprofit } = signal
    try {
        const signalData = {
            type,
            stoploss,
            takeprofit,
            symbol,
            isFree: true
        };
        //let typeSignal =  type === "0" ? "SELL" : "BUY";
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': currentUser.stsTokenManager.accessToken,
            }
        };
        let url = API_URL + 'signals';
        axios.post(url, signalData, axiosConfig).then((ticket) => {
            //dispatch(reset('signal-form'))
            dispatch(asyncActionFinish());
            toastr.success('Success', 'Event has been created');
        })
    } catch (error) {
        dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateSignal = event => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    // const firestore = firebase.firestore();
    // if (event.date !== getState().firestore.ordered.events[0].date) {
    //   event.date = moment(event.date).toDate();
    // }
    try {
    //   let eventDocRef = firestore.collection('events').doc(event.id);
    //   let dateEqual = compareAsc(getState().firestore.ordered.events[0].date.toDate(), event.date);
    //   if (dateEqual !== 0) {
    //     let batch = firestore.batch();
    //     await batch.update(eventDocRef, event);

    //     let eventAttendeeRef = firestore.collection('event_attendee');
    //     let eventAttendeeQuery = await eventAttendeeRef.where('eventId', '==', event.id);
    //     let eventAttendeeQuerySnap = await eventAttendeeQuery.get();

    //     for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
    //       let eventAttendeeDocRef = await firestore.collection('event_attendee').doc(eventAttendeeQuerySnap.docs[i].id);
    //       await batch.update(eventAttendeeDocRef, {
    //         eventDate: event.date
    //       })
    //     }
    //     await batch.commit();
    //   } else {
    //     await eventDocRef.update(event);
    //   }
      dispatch(asyncActionFinish());
      toastr.success('Success', 'Event has been updated');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

// export const cancelToggle = (cancelled, eventId) => async (dispatch, getState, { getFirestore }) => {
//   const firestore = getFirestore();
//   const message = cancelled
//     ? 'Are you sure you want to cancel the event?'
//     : 'This reactivate the event - are you sure?';
//   try {
//     toastr.confirm(message, {
//       onOk: () =>
//         firestore.update(`events/${eventId}`, {
//           cancelled: cancelled
//         })
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getEventsForDashboard = lastEvent => async (dispatch, getState) => {
//   let today = new Date(Date.now());
//   const firestore = firebase.firestore();
//   const eventsRef = firestore.collection('events');
//   try {
//     dispatch(asyncActionStart());
//     let startAfter =
//       lastEvent &&
//       (await firestore
//         .collection('events')
//         .doc(lastEvent.id)
//         .get());
//     let query;

//     lastEvent
//       ? (query = eventsRef
//           .where('date', '>=', today)
//           .orderBy('date')
//           .startAfter(startAfter)
//           .limit(2))
//       : (query = eventsRef
//           .where('date', '>=', today)
//           .orderBy('date')
//           .limit(2));

//     let querySnap = await query.get();

//     if (querySnap.docs.length === 0) {
//       dispatch(asyncActionFinish());
//       return querySnap;
//     }

//     let events = [];

//     for (let i = 0; i < querySnap.docs.length; i++) {
//       let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
//       events.push(evt);
//     }
//     dispatch({ type: FETCH_EVENTS, payload: { events } });
//     dispatch(asyncActionFinish());
//     return querySnap;
//   } catch (error) {
//     console.log(error);
//     dispatch(asyncActionError());
//   }
// };

// export const addEventComment = (eventId, values, parentId) => async (dispatch, getState, { getFirebase }) => {
//   const firebase = getFirebase();
//   const profile = getState().firebase.profile;
//   const user = firebase.auth().currentUser;
//   let newComment = {
//     parentId: parentId,
//     displayName: profile.displayName,
//     photoURL: profile.photoURL || '/assets/user.png',
//     uid: user.uid,
//     text: values.comment,
//     date: Date.now()
//   };
//   try {
//     await firebase.push(`event_chat/${eventId}`, newComment);
//   } catch (error) {
//     console.log(error);
//     toastr.error('Oops', 'Problem adding comment');
//   }
// };
