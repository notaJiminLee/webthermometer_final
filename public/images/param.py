from paramiko import SSHClient
from scp import SCPClient
import paramiko
from subprocess import call
import os

ssh = SSHClient()
ssh.load_system_host_keys()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('34.64.149.18', username='jmlee', password='12345678')

ssh=SCPClient(ssh.get_transport())

ssh.put('/home/pi/param.py', '~/web/webthermometer/public/images/')

ssh.close()
