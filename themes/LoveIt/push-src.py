import time
import os, sys

def main(msg):
	# 备份blog/
	print("*"*10+"push theme/"+"*"*10, end="\n\n")

	os.system('git add .')
	os.system('git commit -m "{}"'.format(msg))
	os.system('git push')

	print('over...')

if __name__ == '__main__':
	msg = input('commit: ')
	main(msg)