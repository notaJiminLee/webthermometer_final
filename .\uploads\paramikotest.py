from paramiko import SSHClient
from scp import SCPClient
import paramiko
from subprocess import call
import os

#cmd = "scp paramikotest.py jmlee@34.64.149.18:~/web/"
#call(cmd.split(" "))

#import subprocess
#p=subprocess.Popen(["scp", "paramikotest.py", "jmlee@34.64.149.18:~/web/"])
#sts=os.waitpid(p.pid, 0)

ssh = SSHClient()
ssh.load_system_host_keys()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('34.64.149.18', username='jmlee', password='12345678')

scp=SCPClient(ssh.get_transport())

scp.put('~/webimagetest.py', '~/web/webthermometer/public/images/')

scp.close()
