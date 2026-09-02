package telemetry

type Config struct {
	Events      map[string]EventType  `json:"events"`
	Pages       map[string]Page       `json:"pages"`
	LinkTargets map[string]LinkTarget `json:"link_targets"`
	Tools       map[string]Tool       `json:"tools"`
}

func BrowserConfig() Config {
	events := make(map[string]EventType, EventTypeCount)
	for i := EventType(0); i < EventTypeCount; i++ {
		events[i.String()] = i
	}

	pages := make(map[string]Page, PageCount)
	for i := Page(0); i < PageCount; i++ {
		pages[pageNames[i]] = i
	}

	linkTargets := make(map[string]LinkTarget, LinkTargetCount)
	for i := LinkTarget(0); i < LinkTargetCount; i++ {
		linkTargets[linkTargetNames[i]] = i
	}

	tools := make(map[string]Tool, ToolCount)
	for i := Tool(0); i < ToolCount; i++ {
		tools[toolNames[i]] = i
	}

	return Config{
		Events:      events,
		Pages:       pages,
		LinkTargets: linkTargets,
		Tools:       tools,
	}
}
