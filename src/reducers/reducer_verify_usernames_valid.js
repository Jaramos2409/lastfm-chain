import { VERIFY_USERNAME_VALID } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case VERIFY_USERNAME_VALID:
            const isUserOneValid = (!action.payload.firstUserRequest.data.error ? true : false);
            const isUserTwoValid = (!action.payload.secondUserRequest.data.error ? true : false);            
            return {
                isUserOneValid,
                isUserTwoValid
            };
        default:
            return state;
    }
}