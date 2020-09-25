angular.module('ualib.news')
	.factory('ualibEventFactory', ['$resource', $resource => {
		const transformResponse = response => JSON.parse(response).events;

		return $resource('https://calendar.ua.edu/api/2/events', {
			days: 365,
			group_id: 32423144336963,
			distinct: true,
		}, {
			today: {
				method: 'GET',
				params: { pp: 4 },
				isArray: true,
				transformResponse,
				cache: true,
			},
		});
	}]);
