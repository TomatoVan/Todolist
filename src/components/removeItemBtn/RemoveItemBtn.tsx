import React, {useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {RequestStatusType} from "../../app/appReducer";

type RemoveBtnPropsType = {
	name: string
	callBack:() => void,
	entityStatus? : RequestStatusType
}

const RemoveItemBtn:React.FC<RemoveBtnPropsType> = React.memo(({callBack, entityStatus }) => {

	const onClickHandler = useCallback(() => {
		callBack()
	},[callBack])

	return (
		<IconButton aria-label="delete" onClick={onClickHandler} disabled={entityStatus === 'loading'}>
			<Delete />
		</IconButton>
	);
});

export default RemoveItemBtn;
