/**
 * Events that can occur when the Outside module is active
 **/
Events.Outside = [
	{ /* Ruined traps */
	title: _('A Ruined Trap'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.buildings["trap"]', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('some of the traps have been torn apart.'),
					_('large prints lead away, into the forest.')
				],
				onLoad: function() {
					var numWrecked = Math.floor(Math.random() * $SM.get('game.buildings["trap"]', true)) + 1;
					$SM.add('game.buildings["trap"]', -numWrecked);
					Outside.updateVillage();
					Outside.updateTrapButton();
				},
				notification: _('some traps have been destroyed'),
				blink: true,
				buttons: {
					'track': {
						text: _('track them'),
						nextScene: {0.5: 'nothing', 1: 'catch'}
					},
					'ignore': {
						text: _('ignore them'),
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					_('the tracks disappear after just a few minutes.'),
					_('the forest is silent.')
				],
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'catch': {
				text: [
					_('not far from the village lies a large beast, its fur matted with blood.'),
					_('it puts up little resistance before the knife.')
				],
				reward: {
					fur: 100,
					meat: 100,
					teeth: 10
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Sickness */
		title: _('Sickness'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 10 && $SM.get('game.population', true) < 50 && $SM.get('stores.medicine', true) > 0 && !$SM.get('civThree');
		},
		scenes: {
			'start': {
				text: [
					_('a sickness is spreading through the village.'),
					_('medicine is needed immediately.')
				],

				blink: true,
				buttons: {
					'heal': {
						text: _('1 medicine'),
						cost: { 'medicine' : 1 },
						nextScene: {1: 'healed'}
					},
					'ignore': {
						text: _('ignore it'),
						nextScene: {1: 'death'}
					}
				}
			},
			'healed': {
				text: [
					_('the sickness is cured in time.')
				],
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'death': {
				text: [
					_('the sickness spreads through the village.'),
					_('the days are spent with burials.'),
					_('the nights are rent with screams.')
				],
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 20) + 1;
					Outside.killVillagers(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},
		
	{ /* Plague */
		title: _('Plague'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 50 && $SM.get('stores.medicine', true) > 0 && !$SM.get('civThree');
		},
		scenes: {
			'start': {
				text: [
					_('a terrible plague is fast spreading through the village.'),
					_('medicine is needed immediately.')
				],
				blink: true,
				buttons: {
					'heal': {
						text: _('5 medicine'),
						cost: { 'medicine' : 5 },
						nextScene: {1: 'healed'}
					},
					'ignore': {
						text: _('do nothing'),
						nextScene: {1: 'death'}
					}
				}
			},
			'healed': {
				text: [
					_('the plague is kept from spreading.'),
					_('only a few die.'),
					_('the rest bury them.')
				],
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 5) + 2;
					Outside.killVillagers(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'death': {
				text: [
					_('the plague rips through the village.'),
					_('the nights are rent with screams.'),
					_('the only hope is a quick death.')
				],
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 80) + 10;
					Outside.killVillagers(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Beast attack */
		title: _('A Beast Attack'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					 _('a pack of snarling beasts pours out of the trees.'),
					 _('the fight is short and bloody, but the beasts are repelled.'),
					 _('the villagers retreat to mourn the dead.')
				],
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 10) + 1;
					Outside.killVillagers(numKilled);
				},
				reward: {
					fur: 100,
					meat: 100,
					teeth: 10
				},
				blink: true,
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Soldier attack */
		title: _('A Military Raid'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.cityCleared');
		},
		scenes: {
			'start': {
				text: [
					_('a gunshot rings through the trees.'),
					_('well armed men charge out of the forest, firing into the crowd.'),
					_('after a skirmish they are driven away, but not without losses.')
				],
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 40) + 1;
					Outside.killVillagers(numKilled);
				},
				reward: {
					bullets: 10,
					'cured meat': 50
				},
				
				blink: true,
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Civ 1 donation */
		title: _('Allies in Spirit'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.civOne');
		},
		scenes: {
			'start': {
				text: [
					_('soft chanting is heard from a distance.'),
					_('a group of monks, garbed in hooded robes appear at the city gates.'),
					_('they present a gift of goods and spiritual items before disappearing into the forest.')
				],
				reward: {
					scales: 100,
					teeth: 100,
					medicine: 10,
					'cured meat': 50,
					leather: 25,
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.1
					}
				},

				blink: true,
				buttons: {
					'end': {
						text: _('accept'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Civ 2 donation */
		title: _('Allies in War'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.civTwo');
		},
		scenes: {
			'start': {
				text: [
					_('a troop of highly disciplined soldiers marches up to the city gates.'),
					_('they are allies... from a nearby civilization once visited.'),
					_('the captain approaches, offering ammunition and weapons.')
				],
				reward: {
					bullets: 100,
					grenade: 10,
					rifle: 5,
					'steel sword': 3,
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.1
					}
				},

				blink: true,
				buttons: {
					'end': {
						text: _('accept'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Civ 3 donation */
		title: _('Allies in Morals'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.civThree');
		},
		scenes: {
			'start': {
				text: [
					_('a caravan of families from a far off civilization approach the city.'),
					_('for helping them once, they give you gifts of appreciation.')
				],
				reward: {
					fur: 100,
					'cured meat': 50,
					leather: 50,
					medicine: 10,
					wood: 250,
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},

				blink: true,
				buttons: {
					'end': {
						text: _('accept'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Civ 4 donation */
		title: _('Allies in Innovation'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.civFour');
		},
		scenes: {
			'start': {
				text: [
					_('a group of scientists, toting laser rifles for protection, ride up to the city.'),
					_('they clamor on about their research and the many discoveries they have made.'),
					_('for supporting their civilization in the past, they offer many gifts.')
				],
				reward: {
					'laser rifle': 3,
					'energy cell': 90,
					iron: 30,
					steel: 15,
					adrenaline: 10,
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 1
					}
				},

				blink: true,
				buttons: {
					'end': {
						text: _('accept'),
						nextScene: 'end'
					}
				}
			}
		}
	},
];
