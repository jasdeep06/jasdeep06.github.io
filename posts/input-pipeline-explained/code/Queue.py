#import stuff
import tensorflow as tf
import threading
import time
#add queue to the graph
q=tf.FIFOQueue(capacity=40000,dtypes=tf.int32,name="queue")
#add op to generate random number
random_number=tf.random_uniform(shape=(),dtype=tf.int32,maxval=50)
#add enqueue operation to the graph
enqueue_op=q.enqueue(random_number,"enqueue_op")
#initialize a session
sess=tf.Session()
def run():
    #vary the range according to number of threads such that range and thread multiply to give 40000
    for i in range(20000):
        #run the enqueue op
        sess.run(enqueue_op)
#create threads
threads=[threading.Thread(target=run,args=()) for i in range(2)]
#record the start time
start=time.time()
#start the threads
[t.start() for t in threads]
#wait for threads to finish
[t.join() for t in threads]
#print size of queue at the end
print(sess.run(q.size()))
#print the time taken
print("time taken",-start+time.time())