import time
import os, sys

def main(msg):
	# 备份blog/
	print("*"*10+"push blog/"+"*"*10, end="\n\n")
	# 生成
	os.system('hugo')

	os.system('git add .')
	os.system('git commit -m "{}"'.format(msg))
	os.system('git push')

	local_back = input('\n本地备份？提示: y\n')
	if local_back == 'y':
		os.system(r'7z a D:\src\xxx.zip D:\src\xxx')
		os.system(r'move D:\src\xxx.zip D:\backup\xxx')
		print('本地备份完成！')

	print('over...')

if __name__ == '__main__':
	msg = input('commit: ')
	main(msg)