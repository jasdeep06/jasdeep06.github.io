import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
#generating data
X_data=np.arange(0,100,0.1)
Y_data=X_data+20*np.sin(X_data/10)
#plotting the data
plt.scatter(X_data,Y_data)
#Uncomment below to see the plot of input data.
#plt.show()
n_samples=1000
X_data=np.reshape(X_data,(n_samples,1))
Y_data=np.reshape(Y_data,(n_samples,1))
#batch size
batch_size=100
#placeholder for X_data
X=tf.placeholder(tf.float32,shape=(batch_size,1))
#placeholder for Y_data
Y=tf.placeholder(tf.float32,shape=(batch_size,1))
#placeholder for checking the validity of our model after training
X_check=tf.placeholder(tf.float32,shape=(n_samples,1))

#defining weight variable
W=tf.Variable(tf.random_normal((1,1)),name="weights")
#defining bias variable
b=tf.Variable(tf.random_normal((1,)),name="bias")
#generating predictions
y_pred=tf.matmul(X,W)+b
#RMSE loss function
loss=tf.reduce_sum(((Y-y_pred)**2)/batch_size)
#defining optimizer
opt_operation=tf.train.AdamOptimizer(.0001).minimize(loss)
#creating a session object
with tf.Session() as sess:
    #initializing the variables
    sess.run(tf.global_variables_initializer())
    #gradient descent loop for 500 steps
    for iteration in range(5000):
        #selecting batches randomly
        indices=np.random.choice(n_samples,batch_size)
        X_batch,Y_batch=X_data[indices],Y_data[indices]
        #running gradient descent step
        _,loss_value=sess.run([opt_operation,loss],feed_dict={X:X_batch,Y:Y_batch})

    #plotting the predictions
    y_check=tf.matmul(X_check,W)+b
    pred=sess.run(y_check,feed_dict={X_check:X_data})
    plt.scatter(X_data,pred)
    plt.scatter(X_data,Y_data)
    plt.show()

