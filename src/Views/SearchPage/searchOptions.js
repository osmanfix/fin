import store from "../../store/store";

export function searchOptions () {
    const state = store.getState()

    return(
        {
            method: 'POST',
            headers: { Authorization: `Bearer ${state.authenticated.accessToken}`, 'Content-Type': 'application/json'} ,
            body: JSON.stringify({
                issueDateInterval: {
                    startDate: state.searchData.startDate,
                    endDate: state.searchData.endDate
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [
                            {
                                type: "company",
                                sparkId: null,
                                entityId: null,
                                inn: state.searchData.inn,
                                maxFullness: state.searchData.maxFullness,
                                inBusinessNews: state.searchData.inBusinessNews
                            }
                        ],
                        onlyMainRole: state.searchData.onlyMainRole,
                        tonality: state.searchData.tonality,

                        onlyWithRiskFactors: false,

                        riskFactors: { and: [], or: [], not: []},
                        themes: { and: [], or: [], not: []}
                    },
                    themesFilter: { and: [], or: [], not: [] }
                },
                searchArea: {
                    includedSources: [],
                    excludedSources: [],
                    includedSourceGroups: [],
                    excludedSourceGroups: []
                },

                attributeFilters: {
                    excludeTechNews: true,
                    excludeAnnouncements: state.searchData.excludeAnnouncements,
                    excludeDigests: true,
                },
                
            similarMode: "duplicates",
                limit: state.searchData.limit,
                sortType: "sourceInfluence",
                sortDirectionType: "desc",
                intervalType: "month",
                histogramTypes: [
                    "totalDocuments",
                    "riskFactors"
                ]
            }),
        }
    )
}
