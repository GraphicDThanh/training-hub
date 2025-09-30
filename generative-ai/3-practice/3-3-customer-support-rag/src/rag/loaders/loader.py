from rag.loaders import services_loader, products_loader, order_process_loader

def main():
    service_split_docs = services_loader.load()
    order_process_split_docs = order_process_loader.load()
    products_split_docs = products_loader.load()

    docs = service_split_docs + order_process_split_docs + products_split_docs
    return docs
