from diagrams import Edge
from bank_portals.constants import EDGE_INBOUND_COLOR, EDGE_OUTBOUND_COLOR, STYLE_SOLID_2


def colored_flow(nodes, color="black", style="", label="", labels=None, forward=True, reverse=False, is_backward=False):
    if not labels:
        labels = [label for _ in range(len(nodes))]

    print(f"==> def colored_flow: nodes {nodes}")
    for index, n2, node_label in zip(nodes, nodes[1:], labels):
        print('node_label: ', node_label)
        print(f"\t----> {index.label} >> Edge(label={node_label}) >> {n2.label}")
        edge = Edge(color=color, style=style, label=node_label, reverse=reverse, forward=forward)
        if is_backward:
            index << edge << n2
        else:
            index >> edge >> n2

        # index >> Edge(label=node_label) >> Edge(color=color, style=style, label=node_label) >> n2
    print("completed with colored_flow")


def inbound_edge(label):
    return Edge(color=EDGE_INBOUND_COLOR, style=STYLE_SOLID_2, label=label)

def outbound_edge(label):
    return Edge(color=EDGE_OUTBOUND_COLOR, style=STYLE_SOLID_2, label=label)
