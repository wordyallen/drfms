import numpy as np
from nvd3Format import nvd3Format

def comSystem(tx_msg, control_index):
	tx_bs = []
	for c in tx_msg:
		byte = np.fromiter(format(ord(c),'b'), dtype=int)
		if len(byte) == 6:
			pad = np.concatenate(([0,0], byte))
		else:
			pad = np.concatenate(([0], byte))

		tx_bs = np.concatenate((tx_bs, pad ))


	SPB = 20
	tx_wave = []
	for n in range(len(tx_bs)):
		bit = tx_bs[n]
		if bit == 1:
			tx_wave = np.concatenate(( tx_wave, np.ones(SPB)))
		else:
			tx_wave = np.concatenate(( tx_wave, np.zeros(SPB)))


	runs = []
	run_len = 0
	val = 0
	for i in tx_wave:
		if i == val:
		    run_len = run_len + 1
		else:
		    val = i
		    runs = np.concatenate((runs, [run_len]))
		    run_len = 1

	runs = np.concatenate((runs, [run_len]))




#  IMPLEMENT STEP RESPONE HERE

	control = np.linspace(0, 0.5, 11)
	k= 1
	a = .9
	#intitial Conditions
	n = np.arange(runs[0]+runs[1]) -runs[0]
	rx_wave =  k*(1-a**(n+1))
	rx_wave[rx_wave < 0] = 0

	for i in range(len(runs)-2):
		if i%2 == 0:
			n = np.arange(runs[i+2])
			s = - k*(1-a**(n+1)) + k
		else:
			n = np.arange(runs[i+2])
			s = k*(1-a**(n+1))
		rx_wave = np.concatenate((rx_wave, s))
	noise = np.random.uniform(-control[control_index], control[control_index], len(rx_wave))
	rx_wave = rx_wave + noise






	threshold = (max(rx_wave)+ min(rx_wave))/2
	sample_ind = np.arange(len(rx_wave))[0:len(rx_wave):SPB] + SPB/2
	rx_bs = rx_wave[sample_ind]>threshold
	rx_bs = rx_bs.astype(float)






	num_chars = len(tx_msg)
	rx_msg = ''
	for i in range(num_chars):
		byte = rx_bs[ i*8 : (i*8 + 8)]
		data = 0
		for j in range(8):
			data = data + byte[j]*2**(8-(j+1))
		data = data.astype(int)
		rx_msg = rx_msg + unichr(data)


	return rx_msg, nvd3Format(tx_wave), nvd3Format(rx_wave)

#
#
# # a = comSystem('Hello and Goodbye', 10)
# # print a[0]
#
# # import matplotlib.pyplot as plt
# # plt.plot(a[1])
# # plt.plot(a[2])
#
# # plt.show()
