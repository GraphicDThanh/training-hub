from diagrams import Cluster, Diagram
from diagrams.onprem.client import Users
from diagrams.aws.compute import Fargate, LambdaFunction, LambdaFunction, Fargate
from diagrams.aws.database import RDS
from diagrams.aws.network import ALB, CF, Route53, VPCElasticNetworkInterface, InternetGateway, NATGateway, APIGateway
from diagrams.aws.security import KMS, IAMRole, Cognito
from diagrams.aws.management import Cloudwatch
from diagrams.aws.storage import S3
from diagrams.aws.integration import SNS, SQS, SimpleQueueServiceSqsQueue, SimpleNotificationServiceSnsTopic
from diagrams.onprem.compute import Server
from bank_portals.constants import (
    EDGE_INBOUND_COLOR, 
    EDGE_OUTBOUND_COLOR,
    EDGE_BOTH_DIRECTION_COLOR,
    STYLE_SOLID_2,
    STYLE_DOTTED_2,
    AWS_CLOUD_CLUSTER_GRAPH_ATTR,
    VPC_CLUSTER_GRAPH_ATTR,
    PUBLIC_SUBNET_CLUSTER_GRAPH_ATTR,
    PRIVATE_SUBNET_CLUSTER_GRAPH_ATTR,
    GRAPH_ATTR,
    OUT_FORMAT,
    SHOW,
    DIRECTION
)
from bank_portals.utils import colored_flow, inbound_edge


title = "Portals High Level Architect (Django) - Improvement Webhook"
filename = "out/portal-high-level-architect-improvement"
filenamegraph = "out/portal-high-level-architect-serverless-improvement.gv"

#################
# Build Diagram #
#################
with Diagram(
    name=title,
    direction=DIRECTION,
    show=SHOW,
    filename=filename,
    outformat=OUT_FORMAT,
    graph_attr={**GRAPH_ATTR}
):
    # Non Clustered
    users = Users("user")
    third_party_server = Server()
    webhook = Server()
    

    # Clustered = Group
    # AWS Cloud > VPC > Subnet
    with Cluster("AWS Cloud", graph_attr=AWS_CLOUD_CLUSTER_GRAPH_ATTR):
        route_53 = Route53("Route53")  # DNS
        s3 = S3("S3")  # S3 - save static resources
        cf = CF("CloudFront")
        cognito = Cognito("Amazon Cognito")
        lambda_fn = LambdaFunction("Lambda")
        cloud_watch = Cloudwatch("CloudWatch")
        role = IAMRole("IAM Role")
        kms = KMS("KMS Key")
        sqs_background_task = SQS("Queue BE Task")
        api_gateway = APIGateway("API Gateway")
        lambda_webhook = LambdaFunction("Lambda Webhook")
        sns_topic = SNS("SNS Topic")
        sqs_webhook = SQS("Queue Webhook")
        sqs_dlq = SimpleQueueServiceSqsQueue("Dead Letter Queue")

        with Cluster("VPC", graph_attr=VPC_CLUSTER_GRAPH_ATTR):
            igw_gateway = InternetGateway("IGW")  # Internet Gateway

            with Cluster("Public Subnet", graph_attr=PUBLIC_SUBNET_CLUSTER_GRAPH_ATTR):
                # NAT Gateway - Network Address Translation
                nat_gw = NATGateway("NAT Gateway")
                # Application Load Balancer
                alb = ALB("ALB") 

            with Cluster("Private Subnet", graph_attr=PRIVATE_SUBNET_CLUSTER_GRAPH_ATTR):
                fargate = Fargate("Fargate")
                # Elastic Network Interface
                eni = VPCElasticNetworkInterface("ENI")
                rds = RDS("RDS")

    #########################
    # FLOW 1: 
    # - User send request
    # - Route53 solve DNS (input: domain, output: IP address)
    # - CloudFront deliver content (CDN, Cache, Edges)
    #########################
    # - users > Route53 (DNS solver) > CloudFront (CDN)
    colored_flow(
        nodes=(users, route_53, cf),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_SOLID_2,
        labels=("DNS resolver", "HTTPS request",),
        reverse=True
    )

    #######################################
    # FLOW 2: AUTHENTICATION WITH COGNITO #
    #######################################
    # - users > cognito > lambda
    colored_flow(
        nodes=(users, cognito, lambda_fn),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_SOLID_2,
        labels=("authentication", "trigger custom auth"),
        reverse=True
    )


    ##############################################
    # FLOW 3: CloudFront distribute to S3 bucket #
    ##############################################
    # - CloudFront <> S3
    colored_flow(
        nodes=(cf, s3),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_SOLID_2,
        labels=("static files"),
        reverse=True
    )
    # - CloudFront <> be app (go through Internet Gateway to go to VPC)
    colored_flow(
        nodes=(cf, igw_gateway),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_SOLID_2,
        labels=("static files"),
        reverse=True
    )

    ############################
    # FLOW 4: CLIENT TO SERVER #
    ############################
    # IGW > ALB > ENI > Fargate task (EC2)
    colored_flow(
        nodes=(igw_gateway, alb , eni, fargate),
        color=EDGE_INBOUND_COLOR,
        style=STYLE_SOLID_2,
        labels=("call api", "", "", "")
    )
    

    ##################################
    # FLOW 5: SERVER TO AWS SERVICES #
    ##################################
    # - server call rds
    colored_flow(
        nodes=(fargate, rds),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_SOLID_2,
        label="CRUD",
        reverse=True,
    )
    # - server call S3
    colored_flow(
        nodes=(fargate, s3),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_DOTTED_2,
        reverse=True,
    )

    ##################################
    # FLOW 6: SERVER TO 3RD SERVICES #
    ##################################
    # - go out to internet (3rd service)
    # ENI > NAT Gateway > IGW > 3RD_SERVICE
    colored_flow(
        nodes=(third_party_server, igw_gateway, nat_gw, fargate),
        color=EDGE_OUTBOUND_COLOR,
        style=STYLE_SOLID_2,
        reverse=True,
        forward=False,
        is_backward=True,
        labels=("Call 3rd APIs", "", "response/request 3rd", "")
    )



    ######################
    # FLOW PERMISSION #
    ######################
    colored_flow(
        nodes=(fargate, role),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_DOTTED_2,
        # label=("access permission"),
        reverse=True
    )

    ######################
    # FLOW INTERGRATION #
    ######################
    colored_flow(
        nodes=(fargate, sqs_background_task),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_DOTTED_2,
        label=("jobs"),
        reverse=True
    )


    ###################
    # FLOW ENCRYPTION #
    ###################
    colored_flow(
        nodes=(rds, kms),
        color=EDGE_BOTH_DIRECTION_COLOR,
        style=STYLE_SOLID_2,
        label=("encrypt/decrypt"),
        reverse=True
    )

    #############
    # FLOW LOGS #
    #############
    services_log = (fargate, alb, lambda_fn)
    for service in services_log:
        colored_flow(
            nodes=(service, cloud_watch),
            color=EDGE_OUTBOUND_COLOR,
            style=STYLE_DOTTED_2,
            # reverse=True
        )

    ######################
    # FLOW WEBHOOK #
    ######################
    colored_flow(
        nodes=(webhook, cf),
        color=EDGE_INBOUND_COLOR,
        style=STYLE_SOLID_2,
        label=("webhook events"),
    )
    # cf > api gateway > lambda > sns > sqs > fargate
    colored_flow(
        nodes=(cf, api_gateway, lambda_webhook, sns_topic, sqs_webhook, fargate),
        color=EDGE_INBOUND_COLOR,
        style=STYLE_SOLID_2,
        labels=("event", "trigger", "send", "publish", "handle")
    )
    # sqs -> sqs dlq
    colored_flow(
        nodes=(sqs_webhook, sqs_dlq),
        color=EDGE_INBOUND_COLOR,
        style=STYLE_SOLID_2,
        labels=("push fail", "")
    )