import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { translateLevel } from 'utils/translateLevel';

export default function TemplateEdit() {
	const { id } = useParams<{ id: string }>();

	const template = useSelector((store: RootState) =>
		store.templates.entities.find(template => template.id === id)
	);

	if (!template) return <Redirect to="/dashboard/templates" />;

	return <div>{translateLevel(template.level)}</div>;
}
