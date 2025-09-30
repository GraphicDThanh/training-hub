# colors
LIGHT_YELLOW = "#FDF7E3"
LIGHT_PURPLE = "#ECE8F6"
LIGHT_BLUE = "#E5F5FD"
LIGHT_GREEN = "#EBF3E7"

# Edge colors
EDGE_INBOUND_COLOR = "red"
EDGE_OUTBOUND_COLOR = "blue"
EDGE_BOTH_DIRECTION_COLOR = "darkgreen"
STYLE_SOLID_2 = "solid,setlinewidth(2)"
STYLE_DOTTED_2 = "dotted,setlinewidth(2)"


CLUSTER_GRAPH_ATTR = {
    "style": "corner", # rounded | corner
    "pencolor": "black",
    "fontsize": "24",
}
AWS_CLOUD_CLUSTER_GRAPH_ATTR = {
    **CLUSTER_GRAPH_ATTR,
    "bgcolor": LIGHT_YELLOW
}
VPC_CLUSTER_GRAPH_ATTR = {
    **CLUSTER_GRAPH_ATTR,
    "bgcolor": LIGHT_PURPLE
}
PUBLIC_SUBNET_CLUSTER_GRAPH_ATTR = {
    **CLUSTER_GRAPH_ATTR,
    "bgcolor": LIGHT_BLUE
}
PRIVATE_SUBNET_CLUSTER_GRAPH_ATTR = {
    **CLUSTER_GRAPH_ATTR,
    "bgcolor": LIGHT_GREEN
}

SHOW = False
DIRECTION = "LR"
OUT_FORMAT = "png"
GRAPH_ATTR = {
    "imagescale": "true",
    "splines": "ortho", # curved | ortho
    "fixedsize": "true",
    "fontsize": "45",
    "remindcross": "true",
    "bgcolor": "white",
    "overlap": "false",
    "overlap_shrink": "false",
    "labelloc": "c",
    "concentrate": "true",
    "rankdir": "LR",
    
}
