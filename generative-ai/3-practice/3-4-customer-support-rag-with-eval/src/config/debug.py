from remote_pdb import RemotePdb


def debug():
    RemotePdb('127.0.0.1', 4444).set_trace()
