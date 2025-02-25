'use client';

import React, { useEffect, useState } from 'react';

type SpinnerNames =
	| 'bouncy'
	| 'bouncyArc'
	| 'cardio'
	| 'chaoticOrbit'
	| 'dotPulse'
	| 'dotSpinner'
	| 'dotStream'
	| 'dotWave'
	| 'grid'
	| 'hatch'
	| 'helix'
	| 'hourglass'
	| 'infinity'
	| 'jelly'
	| 'jellyTriangle'
	| 'leapfrog'
	| 'lineSpinner'
	| 'lineWobble'
	| 'metronome'
	| 'mirage'
	| 'miyagi'
	| 'momentum'
	| 'newtonsCradle'
	| 'orbit'
	| 'ping'
	| 'pinwheel'
	| 'pulsar'
	| 'quantum'
	| 'reuleaux'
	| 'ring'
	| 'ring2'
	| 'ripples'
	| 'spiral'
	| 'square'
	| 'squircle'
	| 'superballs'
	| 'tailChase'
	| 'tailspin'
	| 'treadmill'
	| 'trefoil'
	| 'trio'
	| 'waveform'
	| 'wobble'
	| 'zoomies';

interface Props {
	type: SpinnerNames;
	size?: string;
	stroke?: string;
	speed?: string;
	color?: string;
	className?: string;
}

export default function Loader({ type, color = 'coral', size = '40', speed = '1', stroke = '3', className }: Props) {
	useEffect(() => {
		const load = async () => {
			const ldrsModule = await import('ldrs');
			ldrsModule[type].register('ldrs-icon');
		};
		load();
	}, [type]);

	return (
		<div className={`flex justify-center ${className ?? ''}`}>
			<ldrs-icon size={size as string} stroke={stroke} speed={speed} color={color}></ldrs-icon>
		</div>
	);
}
