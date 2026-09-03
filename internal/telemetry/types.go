package telemetry

// never to be deprecated.
// existing non-sentinel values cannot be adjusted

type EventType uint8

const (
	EventPageServed EventType = iota
	EventView5
	EventRead30
	EventLinkClick
	EventToolProcess

	EventTypeCount
)

var eventNames = [...]string{
	"PAGE_SERVED",
	"VIEW_5",
	"READ_30",
	"LINK_CLICK",
	"TOOL_PROCESS",
}

func (e EventType) String() string {
	if int(e) >= len(eventNames) {
		return "unknown"
	}

	return eventNames[e]
}

type Page uint8

const (
	PageHome Page = iota
	PageBlog
	PageReleases
	PageVehicleOptimizer
	Page404

	PageCount
)

var pageNames = [...]string{
	"/",
	"/blog",
	"/releases",
	"/tools/vehicle-optimizer",
	"404",
}

func (p Page) String() string {
	if int(p) >= len(pageNames) {
		return "unknown"
	}

	return pageNames[p]
}

type LinkTarget uint8

const (
	TargetHeaderHome LinkTarget = iota
	TargetHeaderVehicleOptimizer
	TargetHeaderReleases
	TargetHeaderBlog
	TargetHeaderGitHub

	TargetFooterHome
	TargetFooterLicense
	TargetFooterReleases
	TargetFooterGitHub
	TargetFooterDiscord
	TargetFooterSteam

	TargetHomeVehicleOptimizer
	TargetHomeBlog
	TargetHomeReleases
	TargetHomeGitHub
	TargetHomeDiscord

	TargetReleaseTool
	TargetReleaseWebsiteRepo
	TargetReleaseToolRepo

	LinkTargetCount
)

var linkTargetNames = [...]string{
	"header_home",
	"header_vehicle_optimizer",
	"header_releases",
	"header_blog",
	"header_github",

	"footer_home",
	"footer_license",
	"footer_releases",
	"footer_github",
	"footer_discord",
	"footer_steam",

	"home_vehicle_optimizer",
	"home_blog",
	"home_releases",
	"home_github",
	"home_discord",

	"release_tool",
	"release_website_repo",
	"release_tool_repo",
}

func (t LinkTarget) String() string {
	if int(t) >= len(linkTargetNames) {
		return "unknown"
	}

	return linkTargetNames[t]
}

type Tool uint8

const (
	ToolVehicleOptimizer Tool = iota

	ToolCount
)

var toolNames = [...]string{
	"vehicle_optimizer",
}

func (t Tool) String() string {
	if int(t) >= len(toolNames) {
		return "unknown"
	}

	return toolNames[t]
}
